class fileBone extends Bone
{
    constructor(structrure,data)
    {
        super(structrure,data)
    }
    renderer(boneName) {
        console.log("Render file bone")
        let containter = super.renderer(boneName);

   

        let hiddeninput=document.createElement("input");
        hiddeninput["id"]=boneName+"-filedata";
        hiddeninput["name"]=boneName+(this.structrure.multiple?".0":"");
        hiddeninput["hidden"]=true;
        containter.childNodes[0].appendChild(hiddeninput)
        


        containter.querySelectorAll("input").forEach((element)=>
        {
            console.log("Elel");
            console.log(element);
            element.type="file";
        })
        return containter;
    }
   

}