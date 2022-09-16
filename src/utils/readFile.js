const readFile = async (e) => {
  e.preventDefault()
  const reader = new FileReader()
  reader.onload = async (e) => { 
    const text = (e.target.result)
    console.log(text)
    alert(text)
  };
  reader.readAsText(e.target.files[0])
}

readFile('./example.txt')
