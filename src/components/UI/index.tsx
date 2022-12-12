import './style.css'
const DropdownMenu = (props:any) => {
    return (
      <div className="headerDropdownContainer">
        {props.menu}
        <div className="dropdown1">
          <div className="upArrowContainer">
            <div className="upArrow"></div>
          </div>
          <div className="dropdownMenu">
            {props.firstMenu}
            <ul className="headerDropdownMenu">
              {props.menus &&
                props.menus.map((item:any, index:any) => (
                  <li key={index}>
                    <a
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick && item.onClick();
                        }
                      }}
                      href={`${item.href}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const Modal = (props:any) => {
    if (!props.visible) {
      return null;
    }
    return (
      <>
        <div className="modalFixedBg">
          <div style={{ position: "relative" }}>
            <div className="modalClose" onClick={props.onClose}>
              X
            </div>
            <div className="modalContainer">{props.children}</div>
          </div>
        </div>
      </>
    );
  };

  export {DropdownMenu, Modal}