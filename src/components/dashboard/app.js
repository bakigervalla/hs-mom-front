import React from "react";

export const AppItem = ({ app, onPress }) => {
    return (
        <div className={`flex flex-col items-center text-center cursor-pointer hover:scale-125 text-slate-600 ${app.is_default && 'text-violet-900 font-extrabold'}`}
            onClick={onPress}>
            <img width={24} src={app.image} alt="..." />
            <p className="text-xs ">{app.name}</p>
        </div>
    )
}