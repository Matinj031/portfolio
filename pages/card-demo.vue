<script setup lang="ts">
// Internal component demo — excluded from indexing and sitemap.
// Also disallowed in robots.txt (/card-demo).
definePageMeta({
    layout: 'default',
})

useHead({
    title: 'Card Demo',
    meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ThreedCardContainer>
            <ThreedCardBody
                class="bg-white
                 relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:!bg-slate-800 dark:border-white/[0.2] border-black/[0.1] w-full max-w-fit h-auto rounded-xl p-6 border"
            >
                <ThreedCardItem :translate-z="50" class="text-xl font-bold text-neutral-600 dark:text-white">
                    Pateh
                </ThreedCardItem>
                <ThreedCardItem
                    as="p"
                    :translate-z="60"
                    class="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                    travel agencies for flights, hotels, and car rentals
                </ThreedCardItem>
                <ThreedCardItem :translate-z="100" class="w-full mt-4">
                    <NuxtImg
                        src="images/pateh.png"
                        class="h-60 w-full object-cover rounded-xl"
                        alt="Pateh"
                    />
                </ThreedCardItem>
                <div
                    class="flex justify-center
                  items-center mt-20"
                >
                    <a style="text-decoration: underline; text-underline-offset: 5px" href="https://www.pateh.com" target="_blank">
                        visit website
                    </a>
                </div>
            </ThreedCardBody>
        </ThreedCardContainer>

        <ThreedCardContainer>
            <ThreedCardBody
                class="bg-white
                 relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:!bg-slate-800 dark:border-white/[0.2] border-black/[0.1] w-full max-w-fit h-auto rounded-xl p-6 border"
            >
                <ThreedCardItem :translate-z="50" class="text-xl font-bold text-neutral-600 dark:text-white">
                    TeamChem
                </ThreedCardItem>
                <ThreedCardItem
                    as="p"
                    :translate-z="60"
                    class="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                    Drilling Fluids Additives & Specialty Chemicals
                </ThreedCardItem>
                <ThreedCardItem :translate-z="100" class="w-full mt-4">
                    <NuxtImg
                        src="images/teamchem.png"
                        class="h-60 w-full object-cover rounded-xl"
                        alt="Pateh"
                    />
                </ThreedCardItem>
                <div
                    class="flex justify-center
                  items-center mt-20"
                >
                    <a style="text-decoration: underline; text-underline-offset: 5px" href="https://www.teamchem.co/" target="_blank">
                        visit website
                    </a>
                </div>
            </ThreedCardBody>
        </ThreedCardContainer>
        <ThreedCardContainer>
            <ThreedCardBody
                class="bg-white
                 relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:!bg-slate-800 dark:border-white/[0.2] border-black/[0.1] w-full max-w-fit h-auto rounded-xl p-6 border"
            >
                <ThreedCardItem :translate-z="50" class="text-xl font-bold text-neutral-600 dark:text-white">
                    Discord voice assistant bot
                </ThreedCardItem>
                <ThreedCardItem
                    as="p"
                    :translate-z="60"
                    class="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                    A voice assistant bot for discord servers to help users with their daily tasks  and provide them with information
                </ThreedCardItem>
                <ThreedCardItem :translate-z="100" class="w-full mt-4">
                    <NuxtImg
                        src="images/voice-assistant.png"
                        class="h-60 w-full object-cover rounded-xl"
                        alt="Pateh"
                    />
                </ThreedCardItem>
                <div
                    class="flex justify-center
                  items-center mt-20"
                >
                    <a style="text-decoration: underline; text-underline-offset: 5px" href="https://voice-assistant.bot/" target="_blank">
                        visit website
                    </a>
                </div>
            </ThreedCardBody>
        </ThreedCardContainer>
    </div>
</template>
