import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root=process.cwd();
const output=path.join(root,"public/brand/lis");
await fs.mkdir(output,{recursive:true});
for(const color of ["black","burgundy","white"]){
 const input=path.join(root,"brand-assets/lis/originals",`logo-${color}.png`);
 for(const width of [512,1024]){
  await sharp(input).resize({width,withoutEnlargement:true}).png({compressionLevel:9}).toFile(path.join(output,`logo-${color}-${width}.png`));
 }
}
console.log("Built 6 transparent LIS logo exports.");