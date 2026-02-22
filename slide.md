---
marp: true
theme: muti-onedark
class: invert
paginate: true
math: mathjax
---

<!-- _paginate: false -->

# Activation Sparsity: An Intro

Mu-Ti Chung, 2025.03.02

---

## Outline

1. About Me
1. Background & Motivation
1. Methodology
1. Results & Caveats
1. Similar Ideas
1. Conclusion

---

## About Me

- **Name**: Mu-Ti Chung / Muti / 鍾慕提
- **Location**: Taiwan
- **Work**: Software Engineer @ Ambarella
  - Neural network **compression** & **optimization**

---

## Background & Motivation

- Ambarella chips can benefit from **unstructured sparsity**.
- LLMs are more challenging to prune & retrain.
- FFN takes up $\sim\frac{2}{3}$ of the weights.

---

## Methodology

- How it works.
- Introducing Intrinsic Sparsity
- Inference-Time Exploit
- Analogy to MoE

---

> Insert graphs

---

:::: row

::: column

#### Intrinsic Sparsity

:::

::: column

#### Inference-Time Exploit

:::

::::

---

- Title: My Experience and Attempt on Activation Sparsity
- Outline
- Brief self-intro
    - Muti from Taiwan
    - Worked at Ambarella for 4.5 years as a software engineer.
    - Focused on model compression and optimization, e.g. pruning & quantization.
- Background & Motivation
    - Previous Ambarella chips can make use of unstructured weight sparsity.
    - LLMs are more challenging to prune (retraining is resource-intensive)
    - FFN takes up around 2/3 of the computation/IO.
        - We'd like to reduce the IO bandwidth of the FFN module.
- Methodology: Activation Sparsity via ReLU & predictor.
    - How it works.
    - Introducing intrinsic sparsity: Relufication
    - Predictor training
    - Comparison to MoE
- Results & Caveats
- Other things we've tried
    - Q-Sparse
- Similar Ideas
    - Mixture of Experts
    - DeepSeek Sparse Attention
- Conclusion & Future Work
