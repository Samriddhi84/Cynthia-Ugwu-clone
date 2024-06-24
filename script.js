const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;
function firstpage() {
    var tl = gsap.timeline(); //gsap is used for animations on the web and timeline function creates a timeline instance

    tl.from("#navbar", {
        y: 10,
        opacity: 0,     // the element starts fully transparent
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            stagger: 0.1,
            delay: -1
        })
        .from(".bounding", {
            y: -10,
            ease: Expo.easeInOut,
            opacity: 0,
            duration: 1.5,
            delay: -1
        })
        .from("#last", {
            y: -10,
            ease: Expo.easeInOut,
            opacity: 0,
            duration: 1.5,
            delay: -1
        })
}
firstpage();
//cursor
function mousemove(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#circle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}
mousemove();
function circleskew() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function (dets) {
        this.clearTimeout(timeout);
        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);
        xprev = dets.clientX;
        yprev = dets.clientY;
        // console.log(xdiff, ydiff);
        mousemove(xscale, yscale);
        //done so that the circle gets formed again and not be distorted
        timeout = setTimeout(function () {
            document.querySelector("#circle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        }, 100);
    });
}
circleskew();

//image page

document.querySelectorAll(".parts").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});
