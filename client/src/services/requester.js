

const request = async (url) => {
    try {
        const response = await fetch(url)
        const result = await response.json()

        return result;
    } catch (error) {
        console.log(error);
    }
}