const fileUploadForm = document.getElementById("fileUploadForm");
const uploadStatus = document.getElementById("uploadStatus");

fileUploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const files = new FormData(fileUploadForm);

  try {
    const response = await fetch(
      "https://emotion-recognition-sdn-al4qjjezta-km.a.run.app/uploadmultiplefiles/",
      {
        method: "POST",
        body: files,
      }
    );
    const res = await response.json();
    if (res) {
      const output = document.getElementById("outputTable");
      output.innerHTML = "";
      const prediction = res.prediction;
      prediction.forEach((element) => {
        const html_row = `<tr>
        <td scope="col">${element[0]}</td>
        <td scope="col">${element[1]}</td>
        <td scope="col">${element[2]}</td>
        <td scope="col">${element[3]}</td>
        <td scope="col">${element[4]}</td>
        <td scope="col">${element[5]}</td>
      </tr>`;
        output.innerHTML += html_row;
      });
    }
    console.log(res);
  } catch (error) {
    uploadStatus.innerHTML = "An error occurred.";
  }
});
