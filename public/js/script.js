
document.addEventListener('DOMContentLoaded', function() {
    
    // ✅ Upcoming Event close button
    document.getElementById('close-upEvent').addEventListener('click', function() {
        document.querySelector('.upcoming-event').classList.add('hidden');
    });

    // ✅ Mobile Menu
    const button = document.querySelector('.mobile-menu-button');
    const menu = document.querySelector('.mobile-menu');
    const topLine = document.querySelector('.top-line');
    const middleLine = document.querySelector('.middle-line');
    const bottomLine = document.querySelector('.bottom-line');

    let isOpen = false;

    button.addEventListener('click', () => {
      isOpen = !isOpen;

      // ✅ Toggle menu height
      if (isOpen) {
        menu.classList.remove('max-h-0');
        menu.classList.add('max-h-96');
      } else {
        menu.classList.remove('max-h-96');
        menu.classList.add('max-h-0');
      }

      // ✅ Hamburger to X animation
      topLine.classList.toggle('rotate-45');
      topLine.classList.toggle('translate-y-2');
      middleLine.classList.toggle('opacity-0');
      middleLine.classList.toggle('scale-0');
      bottomLine.classList.toggle('-rotate-45');
      bottomLine.classList.toggle('-translate-y-2');
    });

    // ✅ Sticky Navbar
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        const hero = document.querySelector('.hero');
        if (window.scrollY > 100) {
            navbar.classList.add('fixed');
            hero.style.marginTop = navbar.offsetHeight + 'px'; // add space below
        } else {
            navbar.classList.remove('fixed');
            hero.style.marginTop = '0px'; // reset when scroll up
        }
    });

    // ✅ FAQs Toggle
    const faqs = document.querySelectorAll(".faq");

    faqs.forEach((faq) => {
      faq.querySelector(".faq-btn").onclick = () => {
        faqs.forEach(f => {
          if (f !== faq) {
            f.classList.remove("active");
            f.querySelector(".faq-content").style.maxHeight = "0px";
            f.querySelector(".faq-content").style.opacity = "0";
            f.querySelector(".faq-icon").textContent = "+";
            f.querySelector(".faq-title").classList.replace("text-[#4900BC]","text-[#7F7F7F]");
          }
        });

        const content = faq.querySelector(".faq-content");
        const icon = faq.querySelector(".faq-icon");
        const title = faq.querySelector(".faq-title");

        if (faq.classList.contains("active")) {
          faq.classList.remove("active");
          content.style.maxHeight = "0px";
          content.style.opacity = "0";
          icon.textContent = "+";
          title.classList.replace("text-[#4900BC]","text-[#7F7F7F]");
        } else {
          faq.classList.add("active");
          content.style.maxHeight = content.scrollHeight + "px";
          content.style.opacity = "1";
          icon.textContent = "−";
          title.classList.replace("text-[#7F7F7F]","text-[#4900BC]");
        }
      };
    });

});


// ✅ Floating Video Expanded fullscreen state
window.addEventListener("load", () => {
  const video = document.getElementById("videoPlayer");
  const videoBox = document.getElementById("videoBox");
  const toggleBtn = document.getElementById("toggleBtn");

  // ✅ Lazy load
  video.src = "./public/video/homepage-video.mp4";
  video.load();

  // ✅ Start muted autoplay (works on mobile)
  video.muted = true;
  video.play().catch(() => {});

  let expanded = false;

  toggleBtn.addEventListener("click", () => {
    expanded = !expanded;
    videoBox.classList.toggle("fullscreen", expanded);
    toggleBtn.src = expanded ? "./public/images/collapse.svg" : "./public/images/expand.svg";

    if (expanded) {
      // Unmute & play in fullscreen
      video.muted = false;
      video.play().catch(() => {});
    } else {
      // Return to floating muted
      video.muted = true;
      video.play().catch(() => {});
    }
  });

  // ✅ Pause when tab not visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) video.pause();
    else video.play().catch(() => {});
  });

  // ✅ Pause when not visible on screen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) video.pause();
      else video.play().catch(() => {});
    });
  });
  observer.observe(videoBox);
});