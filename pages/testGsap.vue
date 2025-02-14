<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const { $gsap: gsap } = useNuxtApp();

const main = ref();
const ctx = ref();

onMounted(() => {
    ctx.value = gsap.context((self) => {
        const boxes = self.selector('.box');
        boxes.forEach((box) => {
            gsap.to(box, {
                x: 150,
                scrollTrigger: {
                    trigger: box,
                    start: 'bottom bottom',
                    end: 'top 20%',
                    scrub: true,
                },
            });
        });
    }, main.value);
});

onUnmounted(() => {
    ctx.value.revert(); // <- Easy Cleanup!
});
</script>

<template>
    <div ref="main">
        <div class="box w-5 h-5 bg-red-500"></div>
        <div class="box w-5 h-5 bg-green-500"></div>
        <div class="box w-5 h-5 bg-blue-500"></div>
    </div>
</template>
