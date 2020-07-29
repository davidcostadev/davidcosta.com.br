---
title: Using Popper as Tooltip TypeScript and styled-components
date: '2020-07-29T14:47:04.046Z'
lang: en
tags: ['javascript', 'typescript', 'tooltip', 'styled-components']
description: In this article I talk a little about my journey of doing a tooltip with popper.
---

In this article I talk a little about my journey of doing a tooltip with popper.

---

I was needed to make a customization of a Tooltip, and comes to my mind the possibility of use Popper ([https://popper.js.org](https://popper.js.org/)). Unfortunately, for me, that I was me first time using it with React. I never had an opportunity to work with it before.

So my first action, of course was going deeply in its documentation. _Right way,_ it's suggest to use the Hook version instead of the old version with Render Props. For me hooks is more than enough. The problem came when I opened the documentation to see the usage examples.

In particular, I am more attached to examples than to texts unraveling the code itself. On this page [https://popper.js.org/react-popper/v2/](https://popper.js.org/react-popper/v2/) you will find a single example of very complete hooks or the most complete that I found in the official documentation.

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

Knowing that the lib has much more to offer, that did not satisfy me, so it was here that I started the search for lighting. To solve my problem completely I planned to include **styled-components** and **Typescript**. So this is where I found this article: [https://medium.com/javascript-in-plain-english/usepopper-with-styled-components-for-react-react-popper-2-568284d029bf](https://medium.com/javascript-in-plain-english/usepopper-with-styled-components-for-react-react-popper-2-568284d029bf) (_Unfortunately still in the medium and with wall_) You can find his outline here ([_https://outline.com/sf3jLE_](https://outline.com/sf3jLE)). The one where it shows and explains how to use it is very intuitive and it helps to explain some why. And here you will find the complete code running [https://codesandbox.io/s/blue-worker-w9rtu?file=/src/App.js](https://codesandbox.io/s/blue-worker-w9rtu?file=/src/App.js).

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

Just needed to include some Typescript in this mix. My only difficulty was to understand why the lib needed `useState` instead of `useRef` in the case of the arrow, I still didn't get that answer, but apparently it is because in some moments, it is not possible to determine the target of the arrow, because of the operation of the arrow itself. `useRef` which is initially set to null then in the first render, it is not possible to know the direction it should point. The use of `useState` improves in this regard. According to what was mentioned in this comment: [https://github.com/popperjs/react-popper/issues/354#issuecomment-613937717](https://github.com/popperjs/react-popper/issues/354#issuecomment-613937717)

For me it's good enough however, `ref={setArrowRed}` my Typescript was complaining about this session:

```jsx
<div ref={setArrowRed} style={styles.arrow} className="arrow" />
```

The error was:

```jsx
Type 'Dispatch<SetStateAction<null>>' is not assignable to type 'string | ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined'.
  Type 'Dispatch<SetStateAction<null>>' is not assignable to type '(instance: HTMLDivElement | null) => void'.
    Types of parameters 'value' and 'instance' are incompatible.
      Type 'HTMLDivElement | null' is not assignable to type 'SetStateAction<null>'.
        Type 'HTMLDivElement' is not assignable to type 'SetStateAction<null>'.
          Type 'HTMLDivElement' provides no match for the signature '(prevState: null): null'
```

The trick was to type useState like this:

```diff
- const [arrowRef, setArrowRed] = useState(null);
+ const [arrowRef, setArrowRed] = useState<HTMLDivElement | null>(null);
```

This solved 100% of my problems. You will be able to see the result in this codesandbox: [https://codesandbox.io/s/usepopper-styled-components-xblqg?file=/src/components/Tooltip.tsx:317-390](https://codesandbox.io/s/usepopper-styled-components-xblqg?file=/src/components/Tooltip.tsx:317-390)

---

If this helped you in any way, comment or share, if you have another suggestion don't hesitate to contact me.
