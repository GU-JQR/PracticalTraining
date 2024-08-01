import { onMounted, onUnmounted, ref, Ref } from "vue";

// 为 useClickOutside 函数指定返回类型
const useClickOutside = (elementRef: Ref<null | HTMLElement>): Ref<boolean> => {
  const isClickOutside = ref<boolean>(false);

  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      // 如果点击的 DOM 是 elementRef 的后代则不关闭，否则关闭
      isClickOutside.value = !elementRef.value.contains(e.target as HTMLElement);
    }
  };

  onMounted(() => {
    document.addEventListener("click", handler);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });

  return isClickOutside;
}

export default useClickOutside;
