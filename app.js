

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form");
    const resultado = document.querySelector(".resultado");
    const resultadoPDF = document.querySelector(".resultado-pdf");
    const inputs = document.querySelectorAll(".input");
    const btnPDF = document.querySelector(".btn-pdf");
    const btnEdit = document.querySelector(".btn-edit");
    const parrafos = document.querySelectorAll(".resultado-pdf > p");
    
    const inputsArray = [];
    
    inputs.forEach((input, index) => {
        input.addEventListener("change", (e) => {
            inputsArray[index] = e.target.value;
        });
    });
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        form.classList.remove("active");
        resultado.classList.add("active");
        inputsArray.forEach((item, index) => {
            parrafos[index].innerHTML += item;
        });
    });
    
    btnEdit.addEventListener("click", () => {
        resultado.classList.remove("active");
        form.classList.add("active");
        inputsArray.forEach((_, index) => {
            inputsArray[index] = "";
        })
    })
    
    // --------------------------------

    btnPDF.addEventListener("click", () => {
        html2pdf()
            .set({
                margin: 0.5,
                filename: "datos.pdf",
                image: {
                    type: "jpeg",
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3,
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a5",
                    orientation: "portrait" // portrait o landscape (horizontal)
                }
            })
            .from(resultadoPDF)
            .save()
            .catch(err => alert("Se produjo el siguiente eror: \n" + err))
            .finally()
            .then(() => {
                alert("PDF descargado!")
            });
    })
})

