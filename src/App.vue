<script setup lang="ts">
import { onLaunch } from "@dcloudio/uni-app"
onLaunch(() => {
  console.log("App Launch")
  uni.hideTabBar()
})
</script>
<style lang="scss">
@import "@/ui/styles/index.scss";
</style>
