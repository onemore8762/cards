import React from 'react';
import SuperCheckbox from "./SuperCheckbox/SuperCheckbox";
import SuperButton from "./SuperButton/SuperButton";
import SuperInputText from "./SuperInputText/SuperInputText";

export const SuperComponents = () => {
    return (
        <div>
            <SuperCheckbox/>
            <SuperButton> test</SuperButton>
            <SuperInputText placeholder={'test'}/>
        </div>
    );
};
