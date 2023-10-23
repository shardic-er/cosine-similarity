# Questions to answer:
---
#### Are all embeddings the same length regardless of input size?

Yes, on most models, including the one we are using.

Yes, for many embedding models, including popular ones like Word2Vec,
GloVe, and transformer-based models, the embeddings are of a fixed size,
regardless of the input token's length or the complexity of the text it represents.

    Sub-question: What models would have different length embeddings?

    Variable-length embeddings are uncommon in mainstream models because fixed-size
    embeddings are easier to manage computationally. However, there are recurrent
    architectures or dynamic computation models that might produce or work with 
    variable-length sequences. Still, when used for embeddings, they usually produce
    a fixed-size output.

---

#### What happens when an input is much larger than the size of an embedding?/
#### What determines the models maximum input size?

If an input exceeds a model's maximum token limit, it typically needs to be truncated,
split, or summarized to fit. The model's architecture often determines the maximum
input size. For instance, transformer models like BERT have a set number of positions
(e.g., 512 for BERT).

---
#### What determines the embeddings size?

Embedding size is typically a hyperparameter determined before training.
It's a balance between capturing enough information (larger embedding) and computational
efficiency (smaller embedding).

---

#### How do I explain an embedding to Richard while Madison is judging you?

"Richard, think of an embedding as a way to convert words or sentences into
a list of numbers, kind of like coordinates on a map. These 'coordinates'
help the computer understand the meaning and relationships between words.
It's a bit like turning language into a form of math that machines can work
with efficiently."


---

---


Tokenizing the string breaks it into meaningful chunks, often words or subwords.
Each token gets an index based on its position in the model's vocabulary.
Contextual models consider surrounding tokens when representing a token,
capturing sentence structure.
Tokens are converted to vectors using trained embeddings; in contextual models,
this considers surrounding words.
(Not always applicable) For some tasks or models, additional processing may occur here.
If the objective is to get a single embedding for a sentence or document,
an average or other aggregation method can be applied to all the token vectors.

---

**What is a Token similarity matrix and how is it used in our model?**

A token similarity matrix, as depicted, showcases how similar tokens are to one another.
It can be derived using cosine similarity between token embeddings.
A value close to 1 indicates high similarity, while a value close to 0
indicates low similarity.
The token similarity matrix isn't necessarily a component of the model's architecture.
Instead, it's more of a by-product or tool. Once you have embeddings for tokens,
you can compute this matrix to see how tokens relate to one another.

---
**Does the model go straight to averaging the embeddings of each token?**

Not necessarily. Averaging is a simple method, but models can also use other
techniques like attention mechanisms to weigh tokens differently when combining them.

    What kind of "attention mechanisms" and how do you know what kind of model is using them?

    Attention mechanisms, especially in the context of transformer models, 
    allow the model to "focus" on different parts of the input data with varying degrees
    of attention. The most popular type is the "scaled dot-product attention."
    If the model's documentation or research paper mentions terms like "attention heads"
    or "multi-head attention," it's likely using attention mechanisms.

---

**Is a token embedding just the column of the similarity matrix?**

No. The token embedding is a vector in a high-dimensional space.
The column in the similarity matrix is just the cosine similarity of that token's
embedding with every other token's embedding.

---
**In our model, does the same token index always return the same embedding?**

For non-contextual embeddings, yes. For contextual embeddings
(like those from transformer models), the embedding can vary based on the token's
surrounding context.

    How do I know if the model I am using is a transformer model? 
    Do all transformer models do it this way?

    Transformer models have specific characteristics, like self-attention mechanisms
    and a lack of recurrent layers. If you're using a popular framework, 
    the model's documentation should specify its architecture. Most transformer models
    share this approach, with variations in layers, heads, etc.

    Models like BERT, GPT, T5, and RoBERTa are examples
    of transformer models. They are often associated with terms like
    "attention mechanisms" or "self-attention."
    While all transformer models use attention mechanisms, there are many variations
    and extensions to the original transformer architecture. However, the foundational
    concept of attention remains consistent.

    What is a transformer model and how does it differ from other models?

    A transformer model is a type of neural network architecture introduced 
    in the paper "Attention is All You Need" by Vaswani et al. Its primary feature 
    is the attention mechanism, allowing it to weigh input tokens differently.
    It differs from recurrent models like RNNs and CNNs by being highly parallelizable 
    and capturing long-range dependencies in the data without relying on recurrence.

        What are RNNs and CNNs and LSTMs?

        Parallel vs recurrent?



---
**If context is considered before returning the token embedding, how is it done?**

Contextual models, like transformers, process sequences of tokens together.
They use attention mechanisms to weigh the influence of surrounding tokens,
allowing each token to have an embedding influenced by its context.

    Are all transformers contextual models?

    Yes. Transformer models inherently consider the context due to their self-attention mechanisms.

        Are there contextual models that aren't transformers?
        Yes, RNNs, LSTMS etc also produced contextual embeddings and 

---
**How is each individual token converted to a vector?**

Each token has an initial embedding (like a lookup from a table).
Then, in models like transformers, it goes through layers of transformations
influenced by the other tokens in its context.

    So the token is encoded and the encoded value is an index to look it up in a 
    simple dictionary of embeddings for each token?
    I thought that the embeddings for each token could vary on the context in contextual models.

    You're right on both counts. In non-contextual models (like Word2Vec or GloVe), 
    a token's embedding is static and can be fetched using an index from a dictionary.
    However, in contextual models (like transformers), the initial lookup is just the
    starting point. This initial embedding undergoes several transformations,
    considering its context, resulting in a dynamic, context-aware embedding.

    v2: In non-contextual models, this is precisely how it works. 
    However, in contextual models, this initial embedding is just the starting point.
    The token then goes through several transformations, considering the context,
    to derive a dynamic embedding.

Definitions:
Contextual Embedding: An embedding for a token that is influenced by the surrounding context.

---
**How are the token vectors combined to create a single embedding?**

Methods include:

    Averaging all token vectors.
    Using a special token's embedding (e.g., [CLS] in BERT).
    Weighted averages using attention scores.
    Max pooling or other aggregation methods.
    Remember, the exact answers can vary based on the specific model or 
    implementation you're referring to, but these answers should cover many general cases.

---

And when you say contextual embeddings, you mean contextual embeddings for tokens?

Yes, when we refer to "contextual embeddings," we typically mean embeddings for tokens
that are influenced by their surrounding context. In other words, the same word
can have different embeddings depending on the sentence or sequence in which it appears.


Do Transformer models consider the context when getting a final determination
on the embedding for each token?

Yes. Transformer models, especially when used in models like BERT, GPT, and their
variants, produce individual embeddings for each token that are context-aware.
When a token passes through the Transformer's layers, it interacts with other
tokens in its surrounding context using attention mechanisms. This interaction
influences the final embedding of the token. As a result, in models like BERT,
the same word can have different embeddings in different contexts. For example,
the word "bank" in "I went to the bank" and "I sat on the bank of the river"
will likely have different embeddings after being processed by a BERT-like model.

Do they consider context when averaging those tokens to get a final embedding for the whole text segment?

Transformer models don't inherently average tokens to get a final embedding
for the entire text segment. However, for some tasks, especially in downstream
applications, you might need a single vector representation for a sequence
(like a sentence or paragraph). Several methods can be employed:
Averaging token embeddings: This is a simple method to get a single vector
for the sequence. While it does use the context-aware token embeddings,
it might lose some nuanced information.
Using a special token's embedding: For instance, BERT introduces a special
[CLS] token at the beginning of the input. After processing, the embedding
of this [CLS] token can be used as a representation of the whole sequence.
Attention mechanisms: Some models use attention weights to aggregate token
embeddings differently based on their importance or relevance to the task.
It's essential to note that while the embeddings of individual tokens in
Transformer models are context-sensitive, how you choose to aggregate or use
them for downstream tasks can vary based on the specific application or implementation.

---

New Paradigm:

Given a String of arbritrary length
|#|Name|Example|
|--|--|--|
|1|Tokenize String|"hello how are you?" -> ["hel", "lo ", "how are", "you", "?"]|
|2|Token to Token Index|["hel", "lo ", "how are", "you", "?"] -> [42, 5, 78, 13, 2]|
|3|Get embeddings for each token index from embedding matrix/lookup table|[42, 5, 78, 13, 2] -> [[.8, ...], [-.2, ...], [.9, ...], ...]|
|4|Initial embeddings are contextualized by the model's Transformer layers and interact with other layers in parallel using attention mechanisms|[[.8, ...], [-.2, ...], [.9, ...], ...] -> [[.5, ...], [-.2, ...], [.4, ...], ...]|
|5|???|
|6|average all vectors|


#### Embedding Matrix. for step 3 (Similarity matrix is a chart of the cosine similarities, not used in these steps)
| Token index | x1 | x2 | x3 | x4 | x5 | ... x1532 |
|-------------|----|----|----|----|----|-----------|
| 42          | 1  | .9 | .8 | .7 | .4 |
| 5           | .9 | 1  | .8 | .7 | .4 |
| 78          | .8 | .9 | 1  | .7 | .4 |
| 13          | 1  | .9 | .8 | 1  | .4 |
| 2           | 1  | .9 | .8 | .7 | 1  |
| ...         |


---
Remaining questions:

Understanding the ada-002 model:

Contrastive Learning:
It's a training technique where the goal is to make sure that similar items
(in this case, text or code) produce similar embeddings and dissimilar items produce distinct
embeddings. It does so by contrasting positive pairs (similar items) against negative pairs
(dissimilar items).

In-batch Negatives:
Instead of having a fixed set of negative samples,
the negative samples are dynamically chosen from within the same batch of data.

Transformer Encoder:
This confirms that the model is using the transformer architecture we talked about.
An encoder means it's focusing on understanding or representing the input rather
than generating new sequences.
A "transformer encoder" refers to the layers in the transformer architecture
responsible for processing and transforming the initial embeddings into contextual embeddings.
In the transformer architecture, the encoder takes in the initial embeddings and processes
them in parallel through multiple self-attention layers and feed-forward neural networks.
The output is a set of embeddings that have been informed by and contextualized based on
the surrounding tokens in the input sequence.
In the context of models like BERT, which are entirely built on the transformer architecture,
the entire model can be considered a series of transformer encoders stacked on top of one another.


unsupervised data/ unsupervised learning:
is non-labelled data where the goal is to uncover structure inside of the data

linear-probe classification

autoencoder:
an artificial neural network used for unsupervised learning

generative vs embedding model

    generative trained to maximize likelihood of observed data. info about input is
    distributed over hidden states, which are intermediate representations of the data
    as it passes through layers of the network. It undergoes transformations and the
    hidden states capture different features of the data.
    
    embedding models trained to distinguish observed data from noise


How do transformers work?

Traditional sequence models like RNNs (Recurrent Neural Network) and LSTMs (Long Short Term Memory) process data in
order, which can be a limitation for parallel processing and for capturing long-range dependencies in the data.
Transformers were designed to handle sequences without this strict order dependence, enabling massive parallelization
and effectively capturing distant relationships between sequence elements.

Architecture:

The central component of the Transformer is the attention mechanism, which computes a weighted sum of all elements
in a sequence, rather than just looking at them in a fixed order or context window.
The Transformer model is composed of an encoder and a decoder, though many modern applications (like BERT) use only
the encoder.

Attention Mechanism:

The essence of the attention mechanism is to determine how much focus to place on different parts of the input for
each part of the output.
There are three main components: the query, key, and value. The attention weights are computed by taking
the dot product of the query with all keys, then applying a softmax to obtain a probability distribution.
These probabilities are used to take a weighted sum of the values, which becomes the output of the attention mechanism.

Multi-head Attention:

Instead of having a single set of attention weights, the Transformer uses multiple sets (or "heads"), allowing it to
focus on different parts of the input simultaneously.
The outputs of all heads are concatenated and linearly transformed to produce the final result.

Positional Encoding:

Since the Transformer doesn't process data in order, it doesn't inherently know the positions of elements in a sequence.
To address this, positional encodings are added to the embeddings at the input layer. These encodings are designed
so that the model can learn to use them to identify the relative positions of elements in a sequence.

Feed-forward Layers, Normalization, and Residual Connections:

Each attention output is passed through feed-forward neural networks.
Layer normalization and residual connections are used throughout the model to stabilize and accelerate training.

Applications:

The original Transformer was designed for machine translation, with the encoder processing the input language and
the decoder producing the translation.
However, variants like BERT use only the encoder and are trained to predict masked-out words in a sequence,
making them powerful pre-trained models for a wide range of NLP tasks.
Other models like GPT use only the decoder and are trained as generative language models.

Recent Advances:

The Transformer architecture has sparked a wave of innovation in deep learning for NLP.
BERT, GPT, RoBERTa, T5, and many other models are based on the Transformer architecture, and they have set records
on a wide variety of NLP benchmarks.
The Transformer's ability to process all parts of an input sequence in parallel (rather than sequentially) and its
powerful attention mechanism that allows it to focus differently on all parts of the input for each part of the output
are key factors in its success.


What is an n-gram?

    n-grams are series of n-adjacent characters, symbols or words collected from
    a corpus. Cys-gly-leu would have 3 unigrams (cys, gly, leu) 2 bigrams
    (cys-gly, gly-leu), and 1 trigram (cys-gly-leu). also called shingles when referring
    to words.

| # | Name                                | Example                                                                            | Description                                                                                                                                                                             |
|---|-------------------------------------|------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | **Tokenize String**                 | "hello how are you?" -> ["hello", "how", "are", "you", "?"]                        | The text is broken into smaller units, such as words or subwords.                                                                                                                       |
| 2 | **Token to Token Index**            | ["hello", "how", "are", "you", "?"] -> [42, 5, 78, 13, 2]                          | Each token gets an index based on its position in the model's vocabulary.                                                                                                               |
| 3 | **Get Initial Embeddings**          | [42, 5, 78, 13, 2] -> [[.8, ...], [-.2, ...], [.9, ...], ...]                      | Tokens are mapped to their respective embeddings from a pre-initialized embedding matrix, possibly from pre-trained models.                                                             |
| 4 | **Transformer Encoding**            | [[.8, ...], [-.2, ...], [.9, ...], ...] -> [[.5, ...], [-.2, ...], [.4, ...], ...] | The initial embeddings are processed by transformer layers. This process contextualizes each token embedding, taking into account the surrounding tokens using attention mechanisms.    |
| 5 | **Contrastive Learning Refinement** | [[.5, ...], [-.2, ...], [.4, ...], ...]                                            | If using contrastive learning, pairs of embeddings are processed together. The model is trained to make similar pairs closer and dissimilar pairs farther apart in the embedding space. |
| 6 | **Aggregate Embeddings**            | [[.5, ...], [-.2, ...], [.4, ...], ...] -> [.45, ...]                              | To represent the entire text, embeddings can be combined using methods like averaging, attention pooling, or using special token embeddings (e.g., [CLS] in BERT).                      |

#### Embedding Matrix for Step 3:
| Token index | x1  | x2  | x3  | ... | xN  |
|-------------|-----|-----|-----|-----|-----|
| 42          | .8  | .2  | .1  | ... | -.3 |
| 5           | -.2 | .9  | -.4 | ... | .5  |
| 78          | .5  | .3  | .9  | ... | -.2 |
| 13          | .6  | -.1 | .4  | ... | .6  |
| 2           | .7  | .1  | .3  | ... | .7  |
| ...         | ... | ... | ... | ... | ... |

---

GPT only uses that decoder architecture of the transformer for prediction.

The embedding model is using the encoding architecture of the transformer. The transformer captures the context and relationships within the input data.

mits lecture on


### 1. Initial Processing

| # | Process Name                   | Example                                                                        | Description                                                                                                                                                                         |
|---|--------------------------------|--------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | **Tokenize String**            | "hello how are you?" -> ["hello", "how", "are", "you", "?"]                    | The text is broken into smaller units, such as words or subwords.                                                                                                                   |
| 2 | **Token to Token Index**       | ["hello", "how", "are", "you", "?"] -> [42, 5, 78, 13, 2]                      | Each token gets an index based on its position in the model's vocabulary.                                                                                                           |
| 3 | **Get Initial Embeddings**     | [42, 5, 78, 13, 2] -> [[.8, ...], [-.2, ...], [.9, ...], ...]                  | Tokens are mapped to their respective embeddings from a pre-initialized embedding matrix, possibly from pre-trained models.                                                         |

### 2. Transformer Encoding (This happens per layer)

| #  | Process Name                            | Example                                                                                                          | Description                                                                                                                                                                                                                         |
|----|-----------------------------------------|------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 4  | **Compute Query, Key, Value**           | **Q** = Wq × [.8, ...], **K** = Wk × [.8, ...], **V** = Wv × [.8, ...]                                           | For each token embedding, compute a Query (**Q**), a Key (**K**), and a Value (**V**) using separate learned weight matrices (`Wq`, `Wk`, and `Wv`).                                                                                |
| 5  | **Calculate Attention Scores**          | **Score** = Q × K^T                                                                                              | Determine how much focus each token should have on every other token. It's computed as the dot product between the **Q** of one token and the **K** of all other tokens.                                                            |
| 6  | **Softmax on Scores**                   | e.g., For token "hello": [10, 2, 5, 3, 4] -> [0.6, 0.02, 0.12, 0.05, 0.21]                                       | Apply the softmax function to the attention scores for each token, so they sum up to 1. This gives a probability distribution that indicates how much each token should be "attended to" from the perspective of the current token. |
| 7  | **Compute Weighted Value Vectors**      | e.g., For token "hello": 0.6 × V(hello) + 0.02 × V(how) + 0.12 × V(are) + ...                                    | Take the weighted sum of all value vectors (V) based on the attention probabilities. This effectively gives a new representation for the token that is a blend of its own information and the context from surrounding tokens.      |
| 8  | **Concatenate and Transform**           | Concatenate the weighted values and pass them through a linear layer (Wo).                                       | In multi-head attention, concatenate the output from each head and then transform it using a learned weight matrix (`Wo`). This gives the final attention output for each token.                                                    |
| 9  | **Residual Connection & Normalization** | Original embedding (e.g., [.8, ...]) + Attention output -> LayerNorm applied.                                    | Add the attention output to the original token embedding (residual connection), and then normalize the result using layer normalization. This helps in training stability and convergence.                                          |
| 10 | **Feed-forward Neural Network**         | The normalized output is passed through feed-forward layers. E.g., [.5, ...] -> Feed-forward layers -> [.4, ...] | Each position (token) goes through the same feed-forward neural network, consisting of two linear transformations with a ReLU activation in between.                                                                                |
| 11 | **Residual & Normalization (Again)**    | After the FFNN, another residual connection is made with the input to the FFNN. The result is normalized.        | The output of the FFNN is added to its input (another residual connection) to help with gradient flow. Then, it's normalized.                                                                                                       |

### 3. Post-Processing

| #  | Process Name             | Example                                               | Description                                                                                                                                                        |
|----|--------------------------|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 12 | **Aggregate Embeddings** | [[.5, ...], [-.2, ...], [.4, ...], ...] -> [.45, ...] | To represent the entire text, embeddings can be combined using methods like averaging, attention pooling, or using special token embeddings (e.g., [CLS] in BERT). |


drive, clearview
fuelcard business
pay for gas

build out analytics
get data on repairs
id is vin
data about tpe of repair
different shops word descriptions differently
routes locations etc
this area this long this sort of repair
pinpoint fraud
predict maintenance
ask the model time to break down
predict x miles before type of repair
demo model exists
existing model bad at math
small amount of data going in
in process if getting repair data, trickle in
new surge of data when getting driver monitoring systems
scale amount of data per user

not concerned with integrating, would give a demo to a particular customer
embeddable widget
bimodal dist of customers - one gung ho ai (want to chat wuth data), rest not so myuc.
Should hide that it is ai based
highest level model will be an LLM
automatic prompting of the llm to hide usage


ai in the broad enterprise space is very young
broad use of llms young
best buy handful of experience, mostly inexperienced
ppl with cs degrees vs our graduates

29/30 preferred our b2e grads

rates of conversion. higher with b2e

--

wex previous lab team
led by Talish, 5 ppl
hard for the rest of their prof. dev team
wanted more lab teams

medtronic - 6 market resources missed timelien
york rescued


we can dominate!
traditional context, this is machine learning context
hype, nonsense, jargon
ramp up period - you will have kicked their teeth in 

