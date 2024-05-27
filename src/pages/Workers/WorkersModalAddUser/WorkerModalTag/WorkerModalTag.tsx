import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import styles from "./WorkerModalTag.module.scss";


interface WorkerModalTagProps{
  formData: unknown;
  removeTag:any;

  tags: string[];
  setTags: (tags: string[]) => void;
}


export default function WorkerModalTag({
   setTags,
   tags
   }:WorkerModalTagProps) {




// удаление тега
const removeTag = (index: Key | null | undefined) => {
  setTags(tags.filter((_el, i) => i !== index));
};



  return (
    <div className={styles.workerModalTag}>
    {tags.map((tags: string | number | boolean | ReactElement<string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, index: Key | null | undefined) => (
        <div className={styles.tagItem} key={index}>
          <span className={styles.tagItem__text} >
            {tags}
          </span>
          <span className={styles.tagItem__close}
          onClick={() => removeTag(index)}
          >&times;
          </span>
        </div>
        
      ))}
     
    </div>
  );
}
