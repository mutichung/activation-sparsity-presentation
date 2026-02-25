---
marp: true
theme: muti-onedark
class: invert
paginate: true
math: mathjax
---

<!-- _paginate: false -->

# Activation Sparsity: A Brief Intro

Mu-Ti Chung

2025.03.02

---

## About Me

- **Name**: Mu-Ti Chung / Muti / 鍾慕提
- **Location**: Taiwan
- **Work**: Software Engineer @ Ambarella
  - Model **compression** & **optimization**

![bg right:20% contain](assets/profile_pic.png)

---

## Outline

- Background & Motivation
- Methodology
- Results & Caveats
- Similar Ideas
- Conclusion & Future Work

---

## Background & Motivation

- Ambarella chips benefit from **unstructured sparsity**.
- LLMs are more challenging to prune & retrain.
- FFN takes up $\sim\frac{2}{3}$ of the weights.

![center width:800px](assets/ffn.drawio.svg)

---

![center width:1000px](assets/matmul.drawio.svg)

<!-- _footer: "<sup>*</sup> The up projection route is omitted for simplicity." -->

<!--
Now let's zoom in.
Here I have the matrix multiply layouts of the FFN. I also omit the up-projection route for simplicity, but the idea and the conclusion remains basically the same.

* FFN consists of 2 levels: up + down w/ nonlinearity in the middle.
* Older models like OPT use ReLU.
* ReLU introduces sparsity.
-->

---

![center width:1000px](assets/matmul_sparse.drawio.svg)

<!-- _footer: "<sup>*</sup> The up projection route is omitted for simplicity." -->

<!--
* Sparsity => skip corresponding channels w/o hurting accuracy.
* Both directions!
* Up/gate: output channels
* Down: input channels
-->

---

## Methodology

<!-- - How it works.
- Introducing Intrinsic Sparsity
- Inference-Time Exploit
- Analogy to MoE -->

![center height:150](assets/matmul_only_sparse.drawio.svg)

:::: row

::: column

#### Intrinsic Sparsity

- ReLU promotes **activation sparsity**.
- What about newer models with non-ReLU ones?

==> **Relufication**!

:::

::: column

#### Inference-Time Exploit

- The FFN structure allows us to **save computation** with **no accuracy impact**.
- How to exploit this at inference time?

==> The **predictor** mechanism!

:::

::::

---

### Relufication

- Problem: newer models use SiLU.
- Solution:
  1. Replace other activation functions with **ReLU**
  2. **Retrain** <sup>\[1\]</sup>

:::: row

::: column

#### Sparsity

- ReLU variants <sup>\[2\]</sup>
- Progressive sparsity regularization <sup>\[3\]</sup>
- Insert more ReLUs <sup>\[4\]</sup>

:::

::: column

#### Accuracy

- Better data
- Longer training
- Knowledge distillation

::::

<style scoped>
footer {
    font-size: 13px
}
</style>

<!-- _footer: "
[1] Mirzadeh, Iman, et al. \"Relu strikes back: Exploiting activation sparsity in large language models.\"

[2] Zhang, Zhengyan, et al. \"ReLU<sup>2</sup> Wins: Discovering Efficient Activation Functions for Sparse LLMs.\"

[3] Song, Chenyang, et al. \"Prosparse: Introducing and enhancing intrinsic activation sparsity within large language models.\"

[4] Song, Yixin, et al. \"Turbo sparse: Achieving llm sota performance with minimal activated parameters.\"
" -->

---

### Predictor

- Problem: exploit activation sparsity in up/gate projection.
- Solution: add a **predictor** module <sup>\[1,2\]</sup>

![center](assets/matmul_predictor.drawio.svg)

<style scoped>
footer {
    font-size: 13px
}
</style>

<!-- _footer: "
[1] Liu, Zichang, et al. \"Deja vu: Contextual sparsity for efficient llms at inference time.\"

[2] Alizadeh, Keivan, et al. \"Llm in a flash: Efficient large language model inference with limited memory.\"
" -->

<!-- "
- Skipping down projection is rather easy / intuitive, but that's just 1/3 of the weights.
- Take benefit at the front modules.
" -->

---

#### Analogy to MoE

![center](assets/moe.drawio.svg)

---

#### Predictor Training

1. Freeze the model.
2. Inference and cache activations as training dataset.
   - X: input to FFN.
   - Y: input to down projection.
3. Train predictor on (X, Y).

---

#### Challenges

- Precision vs. recall
  - Focal loss
- Predictor size vs. performance
  - Low-rank adapter
- Intrinsic sparsity $\uparrow$ => difficulty of predictor training $\downarrow$

---

### Summary

---

## Results & Observations

---

## Similar Ideas

- MoE & Upcycling
- Q-Sparse, TEAL, CATS (?)
- Deepseek Sparse Attention (DSA)

---

## Conclusion & Future Work


---

## References

<style scoped>
ul {
    padding-left: 25px
}
li {
    font-size: 20px
}
</style>

- Mirzadeh, Iman, et al. "Relu strikes back: Exploiting activation sparsity in large language models." arXiv preprint arXiv:2310.04564 (2023).
- Zhang, Zhengyan, et al. "ReLU<sup>2</sup> Wins: Discovering Efficient Activation Functions for Sparse LLMs." arXiv preprint arXiv:2402.03804 (2024).
- Song, Chenyang, et al. "Prosparse: Introducing and enhancing intrinsic activation sparsity within large language models." Proceedings of the 31st International Conference on Computational Linguistics. 2025.
- Song, Yixin, et al. "Turbo sparse: Achieving llm sota performance with minimal activated parameters." arXiv preprint arXiv:2406.05955 (2024).
- Liu, Zichang, et al. \"Deja vu: Contextual sparsity for efficient llms at inference time.\" International Conference on Machine Learning. PMLR, 2023.
- Alizadeh, Keivan, et al. "Llm in a flash: Efficient large language model inference with limited memory." Proceedings of the 62nd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers). 2024.

---

```python
def goodbye():
    print("Thanks for having me!")
```

<!-- _footer: "
* Created with markdown using [Marp](https://github.com/marp-team/marp).\n
* Color theme from [onedarkpro.nvim](https://github.com/olimorris/onedarkpro.nvim).\n
* Fonts by [Maple Mono](https://github.com/subframe7536/maple-font).
"-->