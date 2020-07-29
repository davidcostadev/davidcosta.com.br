---
title: Usando Popper como Tooltip com TypeScript e styled-component
date: '2020-07-29T14:47:04.046Z'
lang: pt-br
tags: ['javascript', 'typescript', 'tooltip', 'styled-components']
description: Neste artigo, falo um pouco sobre minha jornada de fazer uma dica de ferramenta com popper
---

Neste artigo, falo um pouco sobre minha jornada de fazer uma dica de ferramenta com popper

---

Estava precisando fazer uma customização de um Tooltip, e surgiu a possibilidade de usar o Popper([https://popper.js.org](https://popper.js.org/)). Infelizmente, para mim, era minha primeira vez usando ele com React. Nunca tive a oportunidade de trabalhar com ele.

Então minha primeira ação, foi claro ir fundo na documentação do dele. Logo de cara ele sugere usar a versão com Hooks, uma versão antiga mostrava como usa-lo usando Render Props. Para mim Hooks é mais que suficiente mesmo. O problema veio quando abri a documentação para ver os exemplos de uso.

Particularmente sou mais apegado a exemplos do que a textos destrinchando o código. Nesta página [https://popper.js.org/react-popper/v2/](https://popper.js.org/react-popper/v2/) você vai encontrar um único exemplo de Hooks bem completo ou o mais completo que encontrei na documentação oficial.

```jsx
import React, { useState } from 'react';
import { usePopper } from 'react-popper';

const Example = () => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

  return (
    <>
      <button type="button" ref={setReferenceElement}>
        Reference element
      </button>

      <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        Popper element
        <div ref={setArrowElement} style={styles.arrow} />
      </div>
    </>
  );
};
```

Sabendo que a lib tem muito mais a oferecer isso não me satisfez, então foi aqui que comecei a busca de iluminação. Para resolver meu problema completamente eu precisava incluir **styled-components** e **Typescript**.Então foi aqui que encontrei esse artigo: [https://medium.com/javascript-in-plain-english/usepopper-with-styled-components-for-react-react-popper-2-568284d029bf](https://medium.com/javascript-in-plain-english/usepopper-with-styled-components-for-react-react-popper-2-568284d029bf) (_Infelizmente ainda no medium e ainda por cima um post com wall_) Você pode encontrar o outline dele aqui([https://outline.com/sf3jLE](https://outline.com/sf3jLE)). A onde ele mostra e explica de for muito intuitiva como usa-lo e ele ajuda exemplificar alguns porquês. E aqui você vai encontrar o código completo rodando [https://codesandbox.io/s/blue-worker-w9rtu?file=/src/App.js](https://codesandbox.io/s/blue-worker-w9rtu?file=/src/App.js)

```jsx
import React, { useState, useRef } from 'react';
import { usePopper } from 'react-popper';
import styled from 'styled-components';

const Dropdown = () => {
  const [showPopper, setShowPopper] = useState(false);

  const buttonRef = useRef(null);
  const popperRef = useRef(null);
  // the ref for the arrow must be a callback ref
  const [arrowRef, setArrowRef] = useState(null);

  const { styles, attributes } = usePopper(buttonRef.current, popperRef.current, {
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowRef,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  return (
    <Page>
      <Info>
        <p>Scroll down and right to find the popper!</p>
      </Info>
      <Button ref={buttonRef} onClick={() => setShowPopper(!showPopper)}>
        Click Me
      </Button>
      {showPopper ? (
        <PopperContainer ref={popperRef} style={styles.popper} {...attributes.popper}>
          <div ref={setArrowRef} style={styles.arrow} id="arrow" />
          <p>I'm a popper</p>
        </PopperContainer>
      ) : null}
    </Page>
  );
};

// a basic page styling
const Page = styled.div`
  width: 250%;
  height: 250%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Info = styled.div`
  background: lightgreen;
  padding: 1rem;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Button = styled.button`
  background: lightblue;
  border: none;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  width: 150px;
  height: 50px;
  outline: none;
`;

const PopperContainer = styled.div`
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: white;
  padding: 20px;
  text-align: center;

  #arrow {
    position: absolute;
    width: 10px;
    height: 10px;
    &:after {
      content: ' ';
      background-color: white;
      box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
      position: absolute;
      top: -25px; // padding + popper height
      left: 0;
      transform: rotate(45deg);
      width: 10px;
      height: 10px;
    }
  }

  &[data-popper-placement^='top'] > #arrow {
    bottom: -30px;
    :after {
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
    }
  }
`;
```

Ótimo só precisava incluir algum Typescript nesta mistura. Minha única dificuldade foi entender o porquê a lib precisava de `useState` ao invés de `useRef` no caso do _arrow_, ainda não consegui essa resposta, mas aparentemente é porque em alguns momentos, não é possível determinar o target do _arrow_, por causa do próprio funcionamento do `useRef` que inicialmente é definido com `null` então no primeiro render, não é possível saber a direção que deve apontar. O uso do `useState` melhorar neste sentido. Segundo o que foi referenciado neste comentário: [https://github.com/popperjs/react-popper/issues/354#issuecomment-613937717](https://github.com/popperjs/react-popper/issues/354#issuecomment-613937717)

Para mim é bom o suficiente entretanto, `ref={setArrowRed}` meu Typescript estava reclamando desta sessão

```jsx
<div ref={setArrowRed} style={styles.arrow} className="arrow" />
```

O erro era:

```jsx
Type 'Dispatch<SetStateAction<null>>' is not assignable to type 'string | ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined'.
  Type 'Dispatch<SetStateAction<null>>' is not assignable to type '(instance: HTMLDivElement | null) => void'.
    Types of parameters 'value' and 'instance' are incompatible.
      Type 'HTMLDivElement | null' is not assignable to type 'SetStateAction<null>'.
        Type 'HTMLDivElement' is not assignable to type 'SetStateAction<null>'.
          Type 'HTMLDivElement' provides no match for the signature '(prevState: null): null'
```

A sacada foi tipar o useState assim:

```diff
- const [arrowRef, setArrowRed] = useState(null);
+ const [arrowRef, setArrowRed] = useState<HTMLDivElement | null>(null);
```

Isso resolveu 100% dos meus problemas. Você conseguirá ver o resultado neste codesandbox: [https://codesandbox.io/s/usepopper-styled-components-xblqg?file=/src/components/Tooltip.tsx:317-390](https://codesandbox.io/s/usepopper-styled-components-xblqg?file=/src/components/Tooltip.tsx:317-390)

---

Se isso lhe ajudou de alguma forma, comente ou compartilhe, caso tenha uma sugestão, não exite em me procurar.
