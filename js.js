async function searchWord() {
    const word = document.getElementById("wordInput").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
  
    if (!word) {
      resultDiv.innerHTML = "<p>يرجى إدخال كلمة</p>";
      return;
    }
  
    const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  
    try {
      const response = await fetch(apiURL);
      if (!response.ok) throw new Error("كلمة غير موجودة");
  
      const data = await response.json();
      const meaning = data[0].meanings[0].definitions[0].definition;
      const phonetics = data[0].phonetics[0]?.text || "لا يوجد";
      const audio = data[0].phonetics[0]?.audio || "";
  
      resultDiv.innerHTML = `
        <h2>${data[0].word}</h2>
        <p><strong>النطق:</strong> ${phonetics}</p>
        ${audio ? `<audio controls src="${audio}"></audio>` : ""}
        <p><strong>المعنى:</strong> ${meaning}</p>
      `;
    } catch (error) {
      resultDiv.innerHTML = `<p>لم يتم العثور على الكلمة.</p>`;
    }
  }
  