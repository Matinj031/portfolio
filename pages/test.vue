<template>
  <div class="base-container select-none">
    <wavy-background class="h-screen w-screen px-4">
      <div>
        <div class="content-wrapper !h-[200vh]">
          <div class="heading select-none">frontend</div>
          <div class="text-container">
            <div
              v-for="(char, charIndex) in chars"
              :key="charIndex"
              class="char"
            >
              {{ char }}
            </div>
          </div>
        </div>
      </div>
    </wavy-background>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "dddd",
});

const {
  $gsap: gsap,
  $ScrollTrigger: ScrollTrigger,
  $lenis: lenis,
} = useNuxtApp();
const chars = ref(["developer", "developer", "developer", "developer"]);

onMounted(() => {
  // Initial setup
  gsap.set(".char", {
    y: 0,
    lineHeight: 0.5,
    opacity: 0,
  });
  gsap.set(".char:first-child", {
    opacity: 1,
  });

  ScrollTrigger.scrollerProxy(window, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value);
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  // Create timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".base-container",
      start: "top top", // Adjust trigger position
      scrub: 2,
      pin: true,
    },
  });

  // Animate each character with stagger
  tl.to(".char", {
    lineHeight: 0.15,
    opacity: 1,
    duration: 0.1,
    stagger: 0.01,
  });
});
onUnmounted(() => {
  if (tl.value) {
    tl.value.kill();
  }
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>
<style scoped>
@font-face {
  font-family: "wild_worldbold";
  src: url("/fonts/wild_world-webfont.woff2") format("woff2"),
    url("/fonts/wild_world-webfont.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.char {
  font-family: "wild_worldbold";
  font-size: clamp(8px, 8.5vw, 250px);
  color: transparent;
  -webkit-text-stroke-width: 2px;
  user-select: none;
}

.char:nth-child(1) {
  opacity: 1;
  z-index: 10;
  color: #e879f9;
  text-shadow: 3px 3px 0px rgb(255, 255, 255);
}
.char:nth-child(2) {
  opacity: 1;
  z-index: 9;
  color: #e879f942;
}
.char:nth-child(3) {
  opacity: 1;
  z-index: 8;
  color: #e879f929;
}
.char:nth-child(4) {
  opacity: 1;
  z-index: 7;
  color: #e879f90a;
}

.heading {
  font-family: "wild_worldbold";
  font-size: clamp(8px, 8.5vw, 250px);
  color: transparent;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: white;
}
</style>
