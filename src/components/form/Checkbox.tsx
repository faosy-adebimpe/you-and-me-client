// https://uiverse.io/SivarajRathinam/stale-warthog-21
interface CheckboxType {
    id: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

import React from 'react';
import styled from 'styled-components';

const Checkbox: React.FC<CheckboxType> = ({ id, checked, onChange }) => {
    return (
        <StyledWrapper>
            <div className='checkbox-wrapper-33'>
                <label className='checkbox'>
                    <input
                        className='checkbox__trigger visuallyhidden'
                        type='checkbox'
                        id={id}
                        checked={checked}
                        onChange={onChange}
                    />
                    <span className='checkbox__symbol'>
                        <svg
                            aria-hidden='true'
                            className='icon-checkbox'
                            width='28px'
                            height='28px'
                            viewBox='0 0 28 28'
                            // version={1}
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path d='M4 14l8 7L24 7' />
                        </svg>
                    </span>
                </label>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .checkbox-wrapper-33 {
        --s-xsmall: 0.625em;
        --s-small: 1.2em;
        --border-width: 1px;
        --c-primary: #5f11e8;
        --c-primary-20-percent-opacity: rgb(95 17 232 / 20%);
        --c-primary-10-percent-opacity: rgb(95 17 232 / 10%);
        --t-base: 0.4s;
        --t-fast: 0.2s;
        --e-in: ease-in;
        --e-out: cubic-bezier(0.11, 0.29, 0.18, 0.98);
    }

    .checkbox-wrapper-33 .visuallyhidden {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }

    .checkbox-wrapper-33 .checkbox {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: white;
    }

    .checkbox-wrapper-33 .checkbox + .checkbox {
        margin-top: var(--s-small);
    }

    .checkbox-wrapper-33 .checkbox__symbol {
        display: inline-block;
        display: flex;
        margin-right: calc(var(--s-small) * 0.7);
        border: var(--border-width) solid var(--c-primary);
        position: relative;
        border-radius: 0.1em;
        width: 1.5em;
        height: 1.5em;
        transition: box-shadow var(--t-base) var(--e-out),
            background-color var(--t-base);
        box-shadow: 0 0 0 0 var(--c-primary-10-percent-opacity);
    }

    .checkbox-wrapper-33 .checkbox__symbol:after {
        content: '';
        position: absolute;
        top: 0.5em;
        left: 0.5em;
        width: 0.25em;
        height: 0.25em;
        background-color: var(--c-primary-20-percent-opacity);
        opacity: 0;
        border-radius: 3em;
        transform: scale(1);
        transform-origin: 50% 50%;
    }

    .checkbox-wrapper-33 .checkbox .icon-checkbox {
        width: 1em;
        height: 1em;
        margin: auto;
        fill: none;
        stroke-width: 3;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-miterlimit: 10;
        color: var(--c-primary);
        display: inline-block;
    }

    .checkbox-wrapper-33 .checkbox .icon-checkbox path {
        transition: stroke-dashoffset var(--t-fast) var(--e-in);
        stroke-dasharray: 30px, 31px;
        stroke-dashoffset: 31px;
    }

    .checkbox-wrapper-33 .checkbox__textwrapper {
        margin: 0;
    }

    .checkbox-wrapper-33 .checkbox__trigger:checked + .checkbox__symbol:after {
        -webkit-animation: ripple-33 1.5s var(--e-out);
        animation: ripple-33 1.5s var(--e-out);
    }

    .checkbox-wrapper-33
        .checkbox__trigger:checked
        + .checkbox__symbol
        .icon-checkbox
        path {
        transition: stroke-dashoffset var(--t-base) var(--e-out);
        stroke-dashoffset: 0px;
    }

    .checkbox-wrapper-33 .checkbox__trigger:focus + .checkbox__symbol {
        box-shadow: 0 0 0 0.25em var(--c-primary-20-percent-opacity);
    }

    @-webkit-keyframes ripple-33 {
        from {
            transform: scale(0);
            opacity: 1;
        }

        to {
            opacity: 0;
            transform: scale(20);
        }
    }

    @keyframes ripple-33 {
        from {
            transform: scale(0);
            opacity: 1;
        }

        to {
            opacity: 0;
            transform: scale(20);
        }
    }
`;

export default Checkbox;

// import React from 'react';
// import styled from 'styled-components';

// const Checkbox = ({
//     id,
//     checked,
//     onChange,
// }: {
//     id: string;
//     checked: boolean;
//     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }) => {
//     return (
//         <StyledWrapper>
//             <label className='container' htmlFor={id}>
//                 <input
//                     className='checkbox'
//                     type='checkbox'
//                     id={id}
//                     checked={checked}
//                     onChange={onChange}
//                 />
//                 <span className='checkbox-label'>
//                     <div className='checkbox-container'>
//                         <div className='box' />
//                         <div className='checkmark'>
//                             <div className='tick-container'>
//                                 <svg
//                                     className='tickmark'
//                                     xmlns='http://www.w3.org/2000/svg'
//                                     viewBox='0 0 52 52'
//                                 >
//                                     <path
//                                         className='tickmark-check'
//                                         fill='none'
//                                         d='M14 27l8 8 16-16'
//                                     />
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>
//                 </span>
//             </label>
//         </StyledWrapper>
//     );
// };

// const StyledWrapper = styled.div`
//     .container {
//         --checkbox-size: 25px;
//         --checkbox-width: 3px;
//         --checkbox-border-radius: 4px;
//         --tickmark-width: 5;
//         --checkmark-box-color: black;
//         --checkmark-color: white;
//     }
//     .checkbox {
//         display: none;
//     }
//     .checkbox-container {
//         width: var(--checkbox-size);
//         height: var(--checkbox-size);
//         position: relative;
//     }
//     .checkbox-container .box {
//         width: 100%;
//         height: 100%;
//         border: var(--checkbox-width) solid rgba(0, 0, 0, 0.5);
//         border-radius: var(--checkbox-border-radius);
//         transition: all 1s ease;
//     }
//     .checkbox-container:hover .box {
//         border-color: var(--checkmark-box-color);
//         border-width: calc(var(--checkbox-width) + 1px);
//     }

//     .checkbox-container .checkmark::before,
//     .checkbox-container .checkmark::after {
//         content: '';
//         background: var(--checkmark-box-color);
//         width: 0%;
//         height: 0%;
//         position: absolute;
//         top: 50%;
//         transition: all 0.5s ease;
//         z-index: -1;
//     }
//     .checkbox-container .checkmark:hover::before,
//     .checkbox:checked + .checkbox-label .checkmark::before {
//         border-radius: var(--checkbox-border-radius);
//         border-top-right-radius: 0px;
//         border-bottom-right-radius: 0px;
//     }

//     .checkbox-container .checkmark:hover::after,
//     .checkbox:checked + .checkbox-label .checkmark::after {
//         border-radius: var(--checkbox-border-radius);
//         border-top-left-radius: 0px;
//         border-bottom-left-radius: 0px;
//     }

//     .checkbox-container .checkmark::after {
//         right: 0;
//     }

//     .checkbox-container .checkmark {
//         z-index: 2;
//         cursor: pointer;
//         width: 100%;
//         height: 100%;
//         position: absolute;
//         top: 0;
//         left: 0;
//     }

//     .checkbox:checked + .checkbox-label .checkmark::before,
//     .checkbox:checked + .checkbox-label .checkmark::after {
//         width: 50%;
//         height: 100%;
//         top: 0;
//     }

//     .tick-container {
//         position: absolute;
//         top: 50%;
//         width: 100%;
//         height: 100%;
//         left: 50%;
//         transform: translate(-50%, -50%);
//     }

//     .checkbox:checked + .checkbox-label .tickmark {
//         position: absolute;
//         top: 0px;
//         width: 100%;
//         stroke: var(--checkmark-color);
//         stroke-width: var(--tickmark-width);
//         stroke-linecap: round;
//         stroke-linejoin: round;
//     }

//     .checkbox:checked + .checkbox-label .tickmark-check {
//         stroke-dasharray: 36; /* Total length of the tick path */
//         stroke-dashoffset: 36; /* Initially hidden */
//         animation: draw-check 0.6s ease-out forwards 0.6s;
//     }

//     @keyframes draw-check {
//         to {
//             stroke-dashoffset: 0;
//         }
//     }
// `;

// export default Checkbox;
