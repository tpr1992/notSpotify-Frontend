import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// ======================================

export default function SwitchLabels() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
  });

  const handleChange = (name) => event => {
    setState({ ...state, [name]: event.target.checked })
  }

  return (
    <div>
    <FormControlLabel
    control={
      <Switch
      checked={state.checkedB}
      onChange={handleChange('checkedB')}
      value="checkedA"
      color="primary"
      />
    }
    label="Now Playing?"
    labelPlacement="top"
    />
    </div>
  )
}
