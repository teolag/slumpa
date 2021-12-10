import { Slumpa } from '../dist'
const s = new Slumpa('boll')

onFormSubmit('frmRandomInt', (form) => {
  form.result.value = s.integer(parseInt(form.min.value), parseInt(form.max.value))
})

onFormSubmit('frmRandomItem', (form) => {
  const animals = ['Horse', 'Monkey', 'Cow', 'Dog', 'Cat']
  form.result.value = s.item(animals)
})

function onFormSubmit(formId: string, submitCallback: (form: HTMLFormElement) => void) {
  const form = getFormById(formId)
  form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    submitCallback(form)
  })
}

function getFormById(id: string): HTMLFormElement {
  const form = document.getElementById(id)
  if (!form) throw Error('elem not found')
  return form as HTMLFormElement
}
