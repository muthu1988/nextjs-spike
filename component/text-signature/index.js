class TextSignature {

    isInitiated = false;
    imageData = null;

    formatInput = (opts) => {
        //handle errror 
        if (!opts || opts == undefined) {
            throw "text-singature: parameter cannot be null or empty";
        }
        if (!opts.font) {
            throw "text-singature: parameter font cannot be empty";
        }
        if (!opts.textString) {
            throw "text-singature: parameter textString cannot be empty";
        }
        if (typeof opts.font === "string") {
            return opts;
        }
        opts.font = (opts.font) || ["12px", "Arial"];
        opts.font = (opts.font).join(" ");
        opts.fillStyle = (opts.color) || "black";
        opts.textString = opts.textString || "Text-Signature !";
        opts.paddingX = opts.paddingX || 0;
        opts.paddingY = opts.paddingY || 0;
        return opts;
    }

    generateImage = (opts) => {

        //parameter sanity and defaults
        opts = this.formatInput(opts);

        const uniquetime = new Date().getUTCMilliseconds();

        //generate canvas
        const canvas = document.createElement('canvas');
        canvas.width = opts.width;
        canvas.height = opts.height;
        canvas.id = "text-signature-" + uniquetime;

        const context = canvas.getContext("2d");
        context.font = opts.font;
        context.fillStyle = opts.fillStyle;
        context.fillText(opts.textString, opts.paddingX, opts.paddingY);

        const dataUrl = canvas.toDataURL();
        this.imageData = dataUrl;

        const img = document.createElement('img');
        img.src = dataUrl;
        img['text-signature-timestamp'] = uniquetime;
        img.id = "text-signature-" + uniquetime;

        if (opts.canvasTargetDom) {
            if (this.isInitiated) {
                document.querySelector(opts.canvasTargetDom).appendChild(img);
            }
        } else {
            window.open(dataUrl, "text-signature image", "width=600, height=200");
        }

    };

    constructor(options) {
        //inject custom font face from external url   
        const existingLink = document.querySelector('head link[id=text-signature]');
        if (existingLink) existingLink.remove();
        const linkElement = document.createElement('link');
        linkElement.rel = "stylesheet";
        linkElement.id = "text-signature";
        linkElement.href = options.customFont.url;
        document.querySelector('head').append(linkElement);

        if (linkElement.addEventListener) {
            linkElement.addEventListener('load', () => {
                this.generateImage(options);
                if (!this.isInitiated) {
                    setTimeout(() => {
                        const canvas = document.querySelector(options.canvasTargetDom);
                        if (canvas) canvas.innerHTML = " "
                        this.generateImage(options);
                    }, 2800);
                }
                this.isInitiated = true;
            }, false);
        }
    }

    getImageData = () => {
        return this.imageData;
    };
    isDomObject = (obj) => {
        return (obj.tagName ? "true" : "false");
    };
    ping = () => {
        console.log("Yup. text-singature is working");
    };
}

module.exports = TextSignature;
