const Slide = ({ children, style, className = "" }: any) => (
    <div className={`xD ${className}`} style={style}>
        {children}
    </div>
);

export default Slide;
