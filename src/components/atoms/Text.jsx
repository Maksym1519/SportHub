import t from './text.module.scss';

export const Text36500 = (props) => {
    const styled = {
        color: props.color,
        lineHeight: props.lineHeight
    }
    return (
        <div className={t.text36500__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
export const Text14500 = (props) => {
    const styled = {
        color: props.color,
        lineHeight: props.lineHeight
    }
    return (
        <div className={`${props.hoverColor} ? ${t.text14500Hovered__wrapper} : ${t.text14500__wrapper}`} style={styled}>
            {props.text}
        </div>
    )
}
export const Text16500 = (props) => {
    const styled = {
        color: props.color,
        lineHeight: props.lineHeight,
        textDecoration: props.underline ? 'underline' : 'none',
         }
        return (
        <div className={`${props.hoverColor} ? ${t.text16500Hovered__wrapper} : ${t.text16500__wrapper}`} style={styled}>
            {props.text}
        </div>
    )
}
export const Text16500R = (props) => {
    const styled = {
        color: props.color,
        lineHeight: props.lineHeight,
        textDecoration: props.underline ? 'underline' : 'none',
        }
    return (
        <div className={t.text16500R__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
export const Text24500 = (props) => {
    const styled = {
        color: props.color
    }
    return (
        <div className={t.text24500__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
export const Text18500 = (props) => {
    const styled = {
        color: props.color
    }
    return (
        <div className={t.text18500__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
export const Text32500 = (props) => {
    const styled = {
        color: props.color,
        textAlign: props.textAlign
    }
    return (
        <div className={t.text32500__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
//--------------------------------------------------------------------------------
export const Text14400 = (props) => {
    const styled = {
        color: props.color,
        textAlign: props.textAlign,
        maxWidth: props.maxWidth,
        marginBottom: props.marginBottom,
        lineHeight: props.lineHeight,
        textDecoration: props.underline ? "underline": ""
    }
    return (
        <div className={`${props.hoverColor !== '' ? t.text14400__wrapper : t.text14400Hovered__wrapper}`} style={styled}>
            {props.text}
            {props.text2}
        </div>
    )
}
export const Text12400 = (props) => {
    const styled = {
        color: props.color,
        underline: props.underline,
        lineHeight: props.lineHeight
    }
    return (
        <div className={t.text12400__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
export const Text16400 = (props) => {
    const styled = {
        color: props.color
    }
    return (
        <div className={t.text16400__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
export const Text16400R = (props) => {
    const styled = {
        color: props.color
    }
    return (
        <div className={t.text16400R__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
//---------------------------------------------------------------------
export const Text16600 = (props) => {
    const styled = {
        color: props.color,
        lineHeight: props.lineHeight
    }
    return (
        <div className={t.text16600__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
export const Text14600 = (props) => {
    const styled = {
        color: props.color
    }
    return (
        <div className={t.text14600__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
export const Text12600 = (props) => {
    const styled = {
        color: props.color
    }
    return (
        <div className={t.text12600__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
export const Text32600 = (props) => {
    const styled = {
        color: props.color
    }
    return (
        <div className={t.text32600__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
export const Text24600 = (props) => {
    const styled = {
        color: props.color
    }
    return (
        <div className={t.text24600__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
export const Text18600 = (props) => {
    const styled = {
        color: props.color
    }
    return (
        <div className={t.text18600__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
export const Text20600 = (props) => {
    const styled = {
        color: props.color
    }
    return (
        <div className={t.text20600__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
//------------------------------------------------------------------------
export const Text14700 = (props) => {
    const styled = {
        color: props.color
    }
    return (
        <div className={t.text14700__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
export const Text18700 = (props) => {
    const styled = {
        color: props.color
    }
    return (
        <div className={t.text18700__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
//uto-300-----------------------------------------------------------------
export const Text12300 = (props) => {
    const styled = {
        color: props.color
    }
    return (
        <div className={t.text12300__wrapper} style={styled}>
            {props.text}
        </div>
    )
}
export const Text16300 = (props) => {
    const styled = {
        color: props.color
    }
    return (
        <div className={t.text16300__wrapper} style={styled}>
            {props.text}
        </div>
    )
}