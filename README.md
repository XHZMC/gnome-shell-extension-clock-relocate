# Clock and Notification Relocator

GNOME Shell 扩展：将时钟移动到右侧，通知横幅移动到右上角

## 功能特性

- ⏰ 将时钟从顶栏中间移动到右侧（在快速设置左边）
- 🔔 将通知横幅从顶栏中间移动到屏幕右上角
- ⚡ 启用/禁用后立即生效，自动恢复原始布局

## 安装方法

1. 复制扩展文件夹到：
   ```bash
   cp -r clock-relocate@xhzmc.github.io ~/.local/share/gnome-shell/extensions/
   ```

2. 重启 GNOME Shell：
   - X11: 按 Alt + F2，输入 `r`，回车
   - Wayland: 注销后重新登录

3. 启用扩展：
   ```bash
   gnome-extensions enable clock-relocate@xhzmc.github.io
   ```

## 卸载方法

```bash
gnome-extensions disable clock-relocate@xhzmc.github.io
rm -rf ~/.local/share/gnome-shell/extensions/clock-relocate@xhzmc.github.io
```

## 兼容性

- GNOME Shell 45+

## 许可证

MIT License
