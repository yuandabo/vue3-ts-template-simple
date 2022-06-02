import { BOXHEIGHTCONSTSUM, BOXHEIGHTCONST } from '@/hooks/table'
import { debounce } from '@/utils'
import { nextTick } from 'vue'

// 动态表格高度
const windowHeight = window.innerHeight
const getHeight = (multipleTableRef, value) => {
  if (!multipleTableRef) return
  let height = BOXHEIGHTCONSTSUM
  if (!value.noForm) {
    const elFormNode = document.querySelector('.el-form')
    const elFormNodeRect = elFormNode?.getBoundingClientRect()
    if (elFormNodeRect) {
      height += elFormNodeRect.height
    }
  }
  if (value.hasOpreate) {
    height += BOXHEIGHTCONST.OPREATE
  }
  nextTick(() => {
    multipleTableRef.layout.setHeight(windowHeight - height + 'px')
    multipleTableRef.doLayout()
  })
}
const addTableHeightListener = (multipleTableRef, value, el) => {
  window.addEventListener(
    'resize',
    debounce(getHeight.bind(null, multipleTableRef, value, el), 200)
  )
}
const removeTableHeightListener = (multipleTableRef, value, el) => {
  window.removeEventListener(
    'resize',
    debounce(getHeight.bind(null, multipleTableRef, value, el), 200)
  )
}

export const autoHeightTable = () => ({
  mounted(el: HTMLElement, binding) {
    const { value, instance } = binding
    const multipleTableRef = instance.$refs.multipleTableRef
    addTableHeightListener(multipleTableRef, value || {}, el)
    const myEvent = new Event('resize')
    window.dispatchEvent(myEvent)
  },
  unmounted(el: HTMLElement, binding) {
    const { value, instance } = binding
    const multipleTableRef = instance.$refs.multipleTableRef
    removeTableHeightListener(multipleTableRef, value || {}, el)
  }
})

export const autoFocus = () => ({
  mounted(el: HTMLElement) {
    if (!el) return
    el.querySelector('input')?.focus()
  }
})
