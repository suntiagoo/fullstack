import Style from '../togglable/Style.module.css';
import { useState, forwardRef, useImperativeHandle } from 'react';
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className={Style['showButton']} style={visible ? { padding: '0%' } : { width: '120px', padding: '1em' }} onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className={Style['wrapper']}>
        {props.children}
        <div style={{ display: '' }}>
          <button className={Style['showButton']} onClick={toggleVisibility}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
});

export default Togglable;
