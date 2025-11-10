// extension.js
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Clutter from 'gi://Clutter';

export default class ClockRelocateExtension {
    constructor() {
        this._dateMenu = null;
        this._originalParent = null;
        this._originalIndex = null;
        this._originalBannerAlignment = null;
    }

    enable() {
        console.log('Clock Relocate Extension enabled');

        // 移动时钟到右侧
        this._relocateClock();
        
        // 移动通知横幅到右上角
        this._relocateNotificationBanner();
    }

    disable() {
        console.log('Clock Relocate Extension disabled');

        // 恢复时钟到原始位置
        this._restoreClock();
        
        // 恢复通知横幅到原始位置
        this._restoreNotificationBanner();
    }

    _relocateClock() {
        // 获取顶部面板
        const panel = Main.panel;
        
        // dateMenu 是时钟组件
        this._dateMenu = Main.panel.statusArea.dateMenu;
        
        if (!this._dateMenu) {
            console.error('DateMenu not found');
            return;
        }

        // 保存原始位置信息
        const container = this._dateMenu.container;
        this._originalParent = container.get_parent();
        this._originalIndex = this._originalParent.get_children().indexOf(container);

        // 从中间区域移除
        this._originalParent.remove_child(container);

        // 添加到右侧区域，但在快速设置（quickSettings）之前
        const rightBox = panel._rightBox;
        const quickSettings = panel.statusArea.quickSettings;
        
        if (quickSettings) {
            const quickSettingsContainer = quickSettings.container;
            const quickSettingsIndex = rightBox.get_children().indexOf(quickSettingsContainer);
            
            // 在快速设置之前插入时钟
            rightBox.insert_child_at_index(container, quickSettingsIndex);
        } else {
            // 如果找不到快速设置，就添加到右侧的开始位置
            rightBox.insert_child_at_index(container, 0);
        }

        console.log('Clock relocated to right side');
    }

    _restoreClock() {
        if (!this._dateMenu || !this._originalParent) {
            return;
        }

        const container = this._dateMenu.container;
        const currentParent = container.get_parent();

        // 从当前位置移除
        if (currentParent) {
            currentParent.remove_child(container);
        }

        // 恢复到原始位置
        this._originalParent.insert_child_at_index(container, this._originalIndex);

        console.log('Clock restored to original position');
    }

    _relocateNotificationBanner() {
        // 保存原始对齐方式
        this._originalBannerAlignment = Main.messageTray.bannerAlignment;

        // 设置横幅对齐到右侧（END）
        Main.messageTray.bannerAlignment = Clutter.ActorAlign.END;

        console.log('Notification banner relocated to top-right');
    }

    _restoreNotificationBanner() {
        // 恢复原始对齐方式
        if (this._originalBannerAlignment !== null) {
            Main.messageTray.bannerAlignment = this._originalBannerAlignment;
        }

        console.log('Notification banner restored to original position');
    }
}
