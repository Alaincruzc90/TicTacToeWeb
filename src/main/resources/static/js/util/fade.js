document.addEventListener("DOMContentLoaded", function () {
    (function () {
        var FX = {
            easing: {
                linear: function (progress) {
                    return progress;
                },
                quadratic: function (progress) {
                    return Math.pow(progress, 2);
                },
                swing: function (progress) {
                    return 0.5 - Math.cos(progress * Math.PI) / 2;
                },
                circ: function (progress) {
                    return 1 - Math.sin(Math.acos(progress));
                },
                back: function (progress, x) {
                    return Math.pow(progress, 2) * ((x + 1) * progress - x);
                },
                bounce: function (progress) {
                    for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                        if (progress >= (7 - 4 * a) / 11) {
                            return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                        }
                    }
                },
                elastic: function (progress, x) {
                    return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
                }
            },
            animate: function (options) {

                // If the complete parameter is not define, then add a empty function.
                if(options.complete === undefined) options.complete = function(){};

                // If the duration parameter is not define, then add a default value.
                if(options.duration === undefined) options.duration = 500;

                var start = new Date;
                options.begin();
                var id = setInterval(function () {
                    var timePassed = new Date - start;
                    var progress = timePassed / options.duration;
                    if (progress > 1) {
                        progress = 1;
                    }
                    options.progress = progress;
                    var delta = options.delta(progress);
                    options.step(delta);
                    if (progress === 1) {
                        clearInterval(id);
                        options.end();
                        options.complete();
                    }
                }, options.delay || 10);
            },
            fadeOut: function (element, options) {
                var to = 1;
                this.animate({
                    begin: function() {

                    },
                    duration: options.duration,
                    delta: function (progress) {
                        progress = this.progress;
                        return FX.easing.swing(progress);
                    },
                    complete: options.complete,
                    step: function (delta) {
                        element.style.opacity = to - delta;
                    },
                    end: function() {
                        element.style.display = "none";
                    }
                });
            },
            fadeIn: function (element, options) {
                var to = 0;
                this.animate({
                    begin: function() {
                        element.style.display = "";
                    },
                    duration: options.duration,
                    delta: function (progress) {
                        progress = this.progress;
                        return FX.easing.swing(progress);
                    },
                    complete: options.complete,
                    step: function (delta) {
                        element.style.opacity = to + delta;
                    },
                    end: function() {

                    }
                });
            }
        };
        window.FX = FX;
    })()
});

