import { extb_io } from '../../../../udblock-scratch-vm/src/util/extb-definitions'
import loadMiscMenu from './udblockmenu_misc'
import loadActionDefinition from './udblock_action'
import loadCamaraDefinition from './udblock_camera'
import loadSensorDefinition from './udblock_sensor'


const id = extb_io.id

export default (Blockly) => {
    // 菜单
    loadMiscMenu(id)
    // 传感器
    loadCamaraDefinition(id)
    loadSensorDefinition(id)
    // 执行器
    loadActionDefinition(id)
}