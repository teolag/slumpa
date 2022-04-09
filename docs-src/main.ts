import { Slumpa, StringSettings } from '../dist'
const s = new Slumpa(778)

onFormSubmit('frmRandomInt', (form) => {
  const min = parseInt(form.min.value)
  const max = parseInt(form.max.value)
  form.result.value = s.integer(min, max)
  form.code.value = `const integer = slumpa.integer(${min}, ${max})`
})

onFormSubmit('frmRandomFloat', (form) => {
  const min = parseInt(form.min.value)
  const max = parseInt(form.max.value)
  form.result.value = s.float(min, max)
  form.code.value = `const float = slumpa.float(${min}, ${max})`
})

onFormSubmit('frmRandomItem', (form) => {
  const animals = ['Horse', 'Monkey', 'Cow', 'Dog', 'Cat']
  form.code.value = `const animal = slumpa.item(['${animals.join("', '")}'])`
  form.result.value = s.item(animals)
})

onFormSubmit('frmShuffle', (form) => {
  const letters = 'ABCDEFGHI'.split('')
  form.code.value = `const letters = slumpa.shuffle(['${letters.join("', '")}'])`
  form.result.value = s.shuffle(letters).join(', ')
})

onFormSubmit('frmString', (form) => {
  const length = parseInt(form.strLength.value)
  const useUppercase = form.uppercase.checked
  const useLowercase = form.lowercase.checked
  const useNumbers = form.numbers.checked
  const useSpecials = form.specials.checked

  const useSettings = !(useUppercase && useLowercase && useNumbers && useSpecials)
  let settings: StringSettings
  let settingsString = ''
  if (useSettings) {
    settings = {}
    if (useUppercase) settings['useUppercase'] = true
    if (useLowercase) settings['useLowercase'] = true
    if (useNumbers) settings['useNumbers'] = true
    if (useSpecials) settings['useSpecials'] = true

    const settingObjectString = Object.entries(settings)
      .map(([key, val]) => '\r\n  ' + key + ':' + val)
      .join(',')
    settingsString = `, {${settingObjectString}${settingObjectString ? '\r\n' : ''}}`
  }

  form.code.value = `const string = slumpa.string(${length}${settingsString})`
  form.result.value = s.string(length, settings)
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
