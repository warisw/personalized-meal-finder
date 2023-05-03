import sys
import random  
import numpy as np 
from transformers import AutoTokenizer, FlaxAutoModelForSeq2SeqLM


modelName = "../model"
tokenizer = AutoTokenizer.from_pretrained(modelName, use_fast=True)
model = FlaxAutoModelForSeq2SeqLM.from_pretrained(modelName)

generation_kwargs = {
    # The maximum length (in tokens) of the generated text.
    "max_length": 2000,
    "min_length": 64,
    # The size of n-grams that should not be repeated in the generated text.
    "no_repeat_ngram_size": 6,
    "do_sample": True,
    "top_k": 50,
    "top_p": 0.9,
    "temperature": 1,  
}

prefix = "items: "
special_tokens = tokenizer.all_special_tokens
tokens_map = {
    "<sep>": "--",
    "<section>": "\n"
}
def generation_function(texts):
    _inputs = texts if isinstance(texts, list) else [texts]
    inputs = [prefix + inp for inp in _inputs]
    inputs = tokenizer(
        inputs, 
        max_length=256, 
        padding="max_length", 
        truncation=True, 
        return_tensors="jax"
    )

    input_ids = inputs.input_ids
    attention_mask = inputs.attention_mask

    output_ids = model.generate(
        input_ids=input_ids, 
        attention_mask=attention_mask,
        **generation_kwargs
    )
    generated = output_ids.sequences
    generated_recipe = target_postprocessing(
        tokenizer.batch_decode(generated, skip_special_tokens=False),
        special_tokens
    )
    
    return generated_recipe

def skip_special_tokens(text, special_tokens):
    for token in special_tokens:
        text = text.replace(token, "")

    return text

def target_postprocessing(texts, special_tokens):
    if not isinstance(texts, list):
        texts = [texts]
    
    new_texts = []
    for text in texts:
        text = skip_special_tokens(text, special_tokens)

        for k, v in tokens_map.items():
            text = text.replace(k, v)

        new_texts.append(text)
 
    return new_texts

def recommend_meal(processed_input):
    np.random.seed(random.randint(0, 1000000))
    generated = generation_function(processed_input)
    for text in generated:
        sections = text.split("\n")
        for section in sections:
            section = section.strip()
            if section.startswith("title:"):
                section = section.replace("title:", "")
                headline = "TITLE"
            elif section.startswith("ingredients:"):
                section = section.replace("ingredients:", "")
                headline = "INGREDIENTS"
            elif section.startswith("directions:"):
                section = section.replace("directions:", "")
                headline = "DIRECTIONS"
            
            if headline == "TITLE":
                print(f"{headline}: {section.strip().capitalize()}")
            else:
                section_info = [f"  - {i+1}: {info.strip().capitalize()}" for i, info in enumerate(section.split("--"))]
                print(f"{headline}:")
                print("\n".join(section_info))

      

if __name__ == '__main__':
   
    
    processed_input = sys.argv[1] 

    recommend_meal(processed_input)
  
