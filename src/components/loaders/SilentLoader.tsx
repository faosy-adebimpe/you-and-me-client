import styled from 'styled-components';

const SilentLoader = () => {
    return (
        <div>
            <Wrapper>
                <span className='loader'></span>
            </Wrapper>
        </div>
    );
};

export default SilentLoader;

const Wrapper = styled.div`
    .loader {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: inline-block;
        border-top: 3px solid #fff;
        border-right: 3px solid transparent;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

// const Wrapper = styled.div`
//     .loader {
//         width: 48px;
//         height: 48px;
//         border-radius: 50%;
//         display: inline-block;
//         border-top: 3px solid #fff;
//         border-right: 3px solid transparent;
//         box-sizing: border-box;
//         animation: rotation 1s linear infinite;
//     }

//     @keyframes rotation {
//         0% {
//             transform: rotate(0deg);
//         }
//         100% {
//             transform: rotate(360deg);
//         }
//     }
// `;
