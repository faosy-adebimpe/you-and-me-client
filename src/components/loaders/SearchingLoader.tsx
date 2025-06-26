import React from 'react';
import styled from 'styled-components';

const SearchingLoader = () => {
    return (
        <StyledWrapper>
            <div className='loader' />
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .loader {
        width: 25px;
        aspect-ratio: 2;
        --_g: no-repeat radial-gradient(circle closest-side, #fff 90%, #0000); // Changed #000 to #fff
        background: var(--_g) 0% 50%, var(--_g) 50% 50%, var(--_g) 100% 50%;
        background-size: calc(100% / 3) 50%;
        animation: l3 1s infinite linear;
    }
    @keyframes l3 {
        20% {
            background-position: 0% 0%, 50% 50%, 100% 50%;
        }
        40% {
            background-position: 0% 100%, 50% 0%, 100% 50%;
        }
        60% {
            background-position: 0% 50%, 50% 100%, 100% 0%;
        }
        80% {
            background-position: 0% 50%, 50% 50%, 100% 100%;
        }
    }
`;

export default SearchingLoader;

// width: 60px;
// aspect-ratio: 2;
// --_g: no-repeat radial-gradient(circle closest-side, #000 90%, #0000);
