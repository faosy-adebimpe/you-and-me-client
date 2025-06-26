import React from 'react';
import styled from 'styled-components';

const SearchLoader = () => {
    return (
        <StyledWrapper>
            <span className='loader'></span>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .loader {
        position: relative;
        width: 100px;
        height: 100px;
    }

    .loader:before,
    .loader:after {
        content: '';
        border-radius: 50%;
        position: absolute;
        inset: 0;
        border: 8px solid #eee; // Add this line for visibility
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3) inset;
    }
    .loader:after {
        border-color: #ff3d00 transparent transparent transparent; // Add this for a spinner effect
        box-shadow: 0 2px 0 #ff3d00 inset;
        animation: rotate 2s linear infinite;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export default SearchLoader;
