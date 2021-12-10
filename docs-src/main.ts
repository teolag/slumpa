import { Slumpa } from '../dist'
const s = new Slumpa('boll')

onFormSubmit('frmRandomInt', (form) => {
  const min = parseInt(form.min.value)
  const max = parseInt(form.max.value)
  form.result.value = s.integer(min, max)
  form.code.value = `const integer = slumpa.integer(${min}, ${max})`
})

onFormSubmit('frmRandomItem', (form) => {
  const animals = ['Horse', 'Monkey', 'Cow', 'Dog', 'Cat']
  form.code.value = `const animal = slumpa.item(${JSON.stringify(animals)})`
  form.result.value = s.item(animals)
})

function onFormSubmit(formId: string, submitCallback: (form: HTMLFormElement) => void) {
  const form = getFormById(formId)
  form.addEventListener('input', () => submitCallback(form))
  form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    submitCallback(form)
  })
  submitCallback(form)
}

function getFormById(id: string): HTMLFormElement {
  const form = document.getElementById(id)
  if (!form) throw Error('elem not found')
  return form as HTMLFormElement
}
