$(document).ready(function () {
  $(".bt:eq(0)").click(function(){
    const tx = document.getElementsByTagName("textarea");
    let inputs =[]
    for (let i = 0; i < tx.length; i++) {
      inputs.push(tx[i].value)
    }
    console.log(inputs[1].split("\n"))
    let notAvailable = ["Not Available IE's \tNot Available Part numbers"]
    let Available = ["Available IE's \tAvailable Part numbers"]
    let rows = inputs[1].split("\n")
    rows.map((item, index)=>{
      let ieno= item.split("\t")[1]
      let partno= item.split("\t")[0]
      if (partno.includes(",")){
        partno=partno.split(",")
      }else{
        partno=[partno]
      }
      if(ieno&&!inputs[0].includes(ieno)){
          notAvailable.push(`${ieno} \t${(item.split("\t")[0])}`)
      }else if(ieno!=''&&ieno&&ieno.includes("i")){
        if(partno&&partno.length>0){
          let a_=[]
          let na_=[]

          partno.map((i)=>{
            if(i&&!inputs[0].includes(i)){
              na_.push(i)
            }else{
              console.log(ieno,inputs[0].split(ieno))
              let nextWord = inputs[0].split(ieno)[1].split("Part No.: ")[1]?.split(" ")[0]?.split("\n")[0]
              if(nextWord.includes(i)){
                a_.push(i)
              }else{
              na_.push(i)
              }
            }
          })
          if(a_&&a_.length>0){
          Available.push(`${ieno} \t${a_.join(",")}`)
          }
          if(na_&&na_.length>0){
            notAvailable.push(`${ieno} \t${na_.join(",")}`)
          }
        }else{
          Available.push(`${ieno} \t`)
        }


      }
    })
    console.log(notAvailable)
     navigator.clipboard.writeText(`${notAvailable.join("\n")}\n\n ${Available.join("\n")}\n\n`)
    $(".modalopen a").click()
  })
  $(".bt:eq(1)").click(function(){
    $("textarea").val("");
  })
  $(".image:nth-child(1)").click(function () {
    $(".form").toggle()
    $(".bt").toggle()
    $(".help").toggle()
  })
});
