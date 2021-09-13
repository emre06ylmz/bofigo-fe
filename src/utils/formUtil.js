const FORM_ITEM_LAYOUT = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  
  const TAIL_FORM_ITEM_LAYOUT = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

export { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT, financial };