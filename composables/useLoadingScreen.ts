export function useUseLoadingScreen() {
    const isLoading = useState('isLoading', () => true)
    const progress = useState('progress', () => 0)

    const start = () => {
        isLoading.value = true
        progress.value = 0
    }

    const finish = () => {
        progress.value = 100
        setTimeout(() => {
            isLoading.value = false
        }, 300)
    }
    return {
        isLoading,
        progress,
        start,
        finish,
    }
}
