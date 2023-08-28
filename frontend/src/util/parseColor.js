export default function parseColor(color) {
    return color.replace(/[ \/]/g,".").toLowerCase()
}
