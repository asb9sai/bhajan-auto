/**
 * ============================================================================
 * SCRIPT NO     : 16
 * SCRIPT NAME   : 16_member_master_manager.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Centered Master Grid Layout Window with Select Dropdowns.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

/**
 * Dynamically builds and displays the center-aligned, high-visibility master grid layout
 */
function renderMemberMasterManagementWindow() {
    if (document.getElementById("modal_member_master_management_layer")) return;

    const overlayDiv = document.createElement("div");
    overlayDiv.id = "modal_member_master_management_layer";
    
    // Adjustment 1: Center the window perfectly to the middle of the screen layout
    overlayDiv.style.position = "fixed";
    overlayDiv.style.top = "0"; overlayDiv.style.left = "0";
    overlayDiv.style.width = "100%"; overlayDiv.style.height = "100%";
    overlayDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
    overlayDiv.style.display = "flex"; overlayDiv.style.justifyContent = "center";
    overlayDiv.style.alignItems = "center"; overlayDiv.style.zIndex = "5000";

    // Adjustment 2: High-visibility increased size metrics shell container
    let interfaceHtmlBlock = `
        <div style="width: 940px; background-color: #fff; border: 4px solid #000; box-sizing: border-box; font-family: Arial, sans-serif; overflow: hidden; box-shadow: 0 4px 25px rgba(0,0,0,0.5);">
            <!-- TITLE ROW BANNER -->
            <div style="background-color: #c00000; color: #fff; text-align: center; padding: 10px; font-size: 22px; font-weight: bold; border-bottom: 3px solid #000; text-transform: uppercase; letter-spacing: 1px;">
                MEMBER MASTER MANAGEMENT
            </div>
            
            <!-- DIVISION HEADERS GRID PANEL -->
            <div style="display: grid; grid-template-columns: 55% 45%; text-align: center; font-weight: bold; font-size: 18px; border-bottom: 3px solid #000;">
                <div style="background-color: #ffff00; padding: 8px; border-right: 3px solid #000; color: #000; text-transform: uppercase;">ATHMA SAI</div>
                <div style="background-color: #4f81bd; padding: 8px; color: #fff; text-transform: uppercase;">NAGARA SANKEERTHANA YAGNA</div>
            </div>
    `;
    interfaceHtmlBlock += `
            <div style="display: grid; grid-template-columns: 55% 45%; min-height: 380px; font-size: 13px;">
                <!-- DIVISION A THREE COLUMN ACTIONS PANEL -->
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); border-right: 2px solid #000; background-color: #fff;">
                    
                    <!-- COLUMN 1: ADDITION BLOCK -->
                    <div style="border-right: 1px solid #000; display: flex; flex-direction: column; padding: 6px; box-sizing: border-box;">
                        <div style="background-color: #d9e1f2; text-align: center; font-size: 13px; font-weight: bold; padding: 6px; border: 1px solid #000; margin-bottom: 8px; color: #000;">ADDITION</div>
                        <div style="margin-bottom: 4px;"><input id="as_add_id" type="text" placeholder="Id Auto" disabled style="width: 100%; font-size: 13px; text-align: center; padding: 4px; background-color: #f2f2f2; border: 1px solid #000; font-weight: bold; color: #000; box-sizing: border-box;"></div>
                        <div style="margin-bottom: 4px;"><input id="as_add_name" type="text" placeholder="ENTER NAME" style="width: 100%; font-size: 13px; text-align: center; padding: 4px; border: 1px solid #000; font-weight: bold; color: #000; text-transform: uppercase; box-sizing: border-box;"></div>
                        <!-- Adjustment 3: Group selection dropdown sits inside row sequence -->
                        <div style="margin-bottom: 4px;"><select id="as_add_group" style="width: 100%; font-size: 13px; font-weight: bold; text-align: center; padding: 3px; border: 1px solid #000; color: #000;"><option value="WED">GROUP: WED ▾</option><option value="FRI">GROUP: FRI ▾</option><option value="ARD">GROUP: ARD ▾</option><option value="MAH">GROUP: MAH ▾</option><option value="SPL">GROUP: SPL ▾</option></select></div>
                        <!-- Adjustment 4 & 5: Preference fields transformed completely to select dropdown lists -->
                        <div style="margin-bottom: 4px;"><select id="as_add_gan" style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px;"><option value="Y">GAN - Y</option><option value="N">GAN - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_add_gur" style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px;"><option value="Y">GUR - Y</option><option value="N">GUR - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_add_dvi" style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px;"><option value="Y">DVI - Y</option><option value="N">DVI - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_add_sdh" style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px;"><option value="Y">SDH - Y</option><option value="N">SDH - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_add_art" style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px;"><option value="Y">ART - Y</option><option value="N">ART - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_add_whl" style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px;"><option value="Y">WHL - Y</option><option value="N">WHL - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_add_sts" style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px; background-color: #fffdf0;"><option value="A">STATUS - A</option><option value="I">STATUS - I</option></select></div>
                    </div>
    `;
    interfaceHtmlBlock += `
                    <!-- COLUMN 2: MODIFICATION BLOCK -->
                    <div style="border-right: 1px solid #000; display: flex; flex-direction: column; padding: 6px; box-sizing: border-box;">
                        <div style="background-color: #d9e1f2; text-align: center; font-size: 13px; font-weight: bold; padding: 6px; border: 1px solid #000; margin-bottom: 8px; color: #000;">MODIFICATION</div>
                        <div style="margin-bottom: 4px;"><input id="as_mod_id" type="text" placeholder="Enter Id" style="width: 100%; font-size: 13px; text-align: center; padding: 4px; border: 1px solid #000; font-weight: bold; color: #000; box-sizing: border-box;"></div>
                        <div style="margin-bottom: 4px;"><input id="as_mod_name" type="text" placeholder="NAME" disabled style="width: 100%; font-size: 13px; text-align: center; padding: 4px; background-color: #f2f2f2; border: 1px solid #7f7f7f; font-weight: bold; color: #000; box-sizing: border-box;"></div>
                        <div style="margin-bottom: 4px;"><input id="as_mod_group" type="text" placeholder="GROUP" disabled style="width: 100%; font-size: 13px; text-align: center; padding: 4px; background-color: #f2f2f2; border: 1px solid #7f7f7f; font-weight: bold; color: #000; text-transform: uppercase; box-sizing: border-box;"></div>
                        <div style="margin-bottom: 4px;"><select id="as_mod_gan" style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px;"><option value="Y">GAN - Y</option><option value="N">GAN - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_mod_gur" style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px;"><option value="Y">GUR - Y</option><option value="N">GUR - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_mod_dvi" style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px;"><option value="Y">DVI - Y</option><option value="N">DVI - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_mod_sdh" style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px;"><option value="Y">SDH - Y</option><option value="N">SDH - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_mod_art" style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px;"><option value="Y">ART - Y</option><option value="N">ART - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_mod_whl" style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px;"><option value="Y">WHL - Y</option><option value="N">WHL - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_mod_sts" style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px; background-color: #fffdf0;"><option value="A">STATUS - A</option><option value="I">STATUS - I</option></select></div>
                    </div>

                    <!-- COLUMN 3: DELETION BLOCK -->
                    <div style="display: flex; flex-direction: column; padding: 6px; box-sizing: border-box;">
                        <div style="background-color: #d9e1f2; text-align: center; font-size: 13px; font-weight: bold; padding: 6px; border: 1px solid #000; margin-bottom: 8px; color: #000;">DELETION</div>
                        <div style="margin-bottom: 4px;"><input id="as_del_id" type="text" placeholder="Enter Id" style="width: 100%; font-size: 13px; text-align: center; padding: 4px; border: 1px solid #000; font-weight: bold; color: #000; box-sizing: border-box;"></div>
                        <div style="margin-bottom: 4px;"><input id="as_del_name" type="text" placeholder="NAME" disabled style="width: 100%; font-size: 13px; text-align: center; padding: 4px; background-color: #f2f2f2; border: 1px solid #7f7f7f; font-weight: bold; color: #000; box-sizing: border-box;"></div>
                        <div style="margin-bottom: 4px;"><input id="as_del_group" type="text" placeholder="GROUP" disabled style="width: 100%; font-size: 13px; text-align: center; padding: 4px; background-color: #f2f2f2; border: 1px solid #7f7f7f; font-weight: bold; color: #000; text-transform: uppercase; box-sizing: border-box;"></div>
                        <div style="margin-bottom: 4px;"><select id="as_del_gan" disabled style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px; background-color: #f2f2f2;"><option value="Y">GAN - Y</option><option value="N">GAN - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_del_gur" disabled style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px; background-color: #f2f2f2;"><option value="Y">GUR - Y</option><option value="N">GUR - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_del_dvi" disabled style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px; background-color: #f2f2f2;"><option value="Y">DVI - Y</option><option value="N">DVI - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_del_sdh" disabled style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px; background-color: #f2f2f2;"><option value="Y">SDH - Y</option><option value="N">SDH - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_del_art" disabled style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px; background-color: #f2f2f2;"><option value="Y">ART - Y</option><option value="N">ART - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_del_whl" disabled style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px; background-color: #f2f2f2;"><option value="Y">WHL - Y</option><option value="N">WHL - N</option></select></div>
                        <div style="margin-bottom: 4px;"><select id="as_del_sts" disabled style="width:100%; font-size:13px; font-weight:bold; border:1px solid #000; padding:3px; background-color: #f2f2f2;"><option value="A">STATUS - A</option><option value="I">STATUS - I</option></select></div>
                    </div>
                </div>
    `;
    interfaceHtmlBlock += `
                <!-- DIVISION B COLUMN LAYOUT -->
                <div style="background-color: #fff; display: flex; justify-content: center; align-items: center; padding: 20px; text-align: center; font-weight: bold; font-size: 16px; color: #002060; line-height: 1.5; box-sizing: border-box;">
                    NOW WE CREATE PROVISION. WILL INTEGRATE LATER
                </div>
            </div>

            <!-- Adjustment 1 & 6: Unified bottom master buttons row spanning the full table layout baseline -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; border-top: 4px solid #000; font-size: 16px; font-weight: bold;">
                <button id="as_confirm_btn" style="background-color: #ffff00; color: #000; font-weight: bold; padding: 14px 0; border: none; border-right: 3px solid #000; cursor: pointer; text-transform: uppercase;">CONFIRM</button>
                <button id="as_save_btn" style="background-color: #4f81bd; color: #fff; font-weight: bold; padding: 14px 0; border: none; border-right: 3px solid #000; cursor: pointer; text-transform: uppercase;">SAVE</button>
                <button id="master_panel_cancel_btn" style="background-color: #ff0000; color: #fff; font-weight: bold; padding: 14px 0; border: none; cursor: pointer; text-transform: uppercase;">CANCEL</button>
            </div>
        </div>
    `;

    overlayDiv.innerHTML = interfaceHtmlBlock;
    document.body.appendChild(overlayDiv);

    // Bind safe dismissal logic loop cleanly to clear screen layout
    document.getElementById("master_panel_cancel_btn").addEventListener("click", () => { overlayDiv.remove(); });
    
    // Set auto creation ID increment counter number natively on mount
    if (typeof window.GLOBAL_MASTER_MEMBER_ROWS !== "undefined") {
        document.getElementById("as_add_id").value = window.GLOBAL_MASTER_MEMBER_ROWS.length + 1;
    }
    
    setupInternalMasterFormLogicHandlers(overlayDiv);
}
/**
 * Automates form record lookups and save synchronization routines
 */
function setupInternalMasterFormLogicHandlers(modalContainer) {
    const modIdInput = document.getElementById("as_mod_id");
    if (modIdInput) {
        modIdInput.addEventListener("input", () => {
            const targetId = modIdInput.value.trim();
            const member = window.GLOBAL_MASTER_MEMBER_ROWS.find(m => m.ID === targetId);
            if (member) {
                document.getElementById("as_mod_name").value = member.NAME || "";
                document.getElementById("as_mod_group").value = member.WED === "Y" ? "WED" : (member.FRI === "Y" ? "FRI" : "ARD");
                document.getElementById("as_mod_gan").value = member.GAN || "N";
                document.getElementById("as_mod_gur").value = member.GUR || "N";
                document.getElementById("as_mod_dvi").value = member.DVI || "N";
                document.getElementById("as_mod_sdh").value = member.SDH || "N";
                document.getElementById("as_mod_art").value = member.ART || "N";
                document.getElementById("as_mod_whl").value = member.WHL || "N";
                document.getElementById("as_mod_sts").value = member.STS || "A";
            }
        });
    }

    const delIdInput = document.getElementById("as_del_id");
    if (delIdInput) {
        delIdInput.addEventListener("input", () => {
            const targetId = delIdInput.value.trim();
            const member = window.GLOBAL_MASTER_MEMBER_ROWS.find(m => m.ID === targetId);
            if (member) {
                document.getElementById("as_del_name").value = member.NAME || "";
                document.getElementById("as_del_group").value = member.WED === "Y" ? "WED" : "FRI";
                document.getElementById("as_del_gan").value = member.GAN || "N";
                document.getElementById("as_del_gur").value = member.GUR || "N";
                document.getElementById("as_del_dvi").value = member.DVI || "N";
                document.getElementById("as_del_sdh").value = member.SDH || "N";
                document.getElementById("as_del_art").value = member.ART || "N";
                document.getElementById("as_del_whl").value = member.WHL || "N";
                document.getElementById("as_del_sts").value = member.STS || "A";
            }
        });
    }

    const confirmBtn = document.getElementById("as_confirm_btn");
    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
            const newName = document.getElementById("as_add_name").value.trim().toUpperCase();
            if (!newName) { alert("Sairam! Please enter a valid member name."); return; }
            const newIdStr = String(window.GLOBAL_MASTER_MEMBER_ROWS.length + 1);
            const chosenGroup = document.getElementById("as_add_group").value;

            window.GLOBAL_MASTER_MEMBER_ROWS.push({
                "ID": newIdStr, "NAME": newName,
                "WED": chosenGroup === "WED" ? "Y" : "N", "FRI": chosenGroup === "FRI" ? "Y" : "N",
                "ARD": chosenGroup === "ARD" ? "Y" : "N", "MAH": chosenGroup === "MAH" ? "Y" : "N", "SPL": chosenGroup === "SPL" ? "Y" : "N",
                "GAN": document.getElementById("as_add_gan").value,
                "GUR": document.getElementById("as_add_gur").value,
                "DVI": document.getElementById("as_add_dvi").value,
                "SDH": document.getElementById("as_add_sdh").value,
                "ART": document.getElementById("as_add_art").value,
                "WHL": document.getElementById("as_add_whl").value,
                "STS": document.getElementById("as_add_sts").value
            });
            alert(`Sairam! Successfully committed ID No ${newIdStr} (${newName}) into database rows.`);
            modalContainer.remove();
        });
    }

    const saveBtn = document.getElementById("as_save_btn");
    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            const modId = document.getElementById("as_mod_id").value.trim();
            const delId = document.getElementById("as_del_id").value.trim();
            const targetId = modId || delId;

            const member = window.GLOBAL_MASTER_MEMBER_ROWS.find(m => m.ID === targetId);
            if (!member) { alert("Sairam! Please specify a valid member record ID."); return; }

            if (modId) {
                member.GAN = document.getElementById("as_mod_gan").value;
                member.GUR = document.getElementById("as_mod_gur").value;
                member.DVI = document.getElementById("as_mod_dvi").value;
                member.SDH = document.getElementById("as_mod_sdh").value;
                member.ART = document.getElementById("as_mod_art").value;
                member.WHL = document.getElementById("as_mod_whl").value;
                member.STS = document.getElementById("as_mod_sts").value;
                alert(`Sairam! ID No ${targetId} record matrix successfully updated.`);
            } else if (delId) {
                member.STS = "I";
                alert(`Sairam! ID No ${targetId} profile flag marked soft-deleted as INACTIVE.`);
            }
            modalContainer.remove();
        });
    }
}

// --- BIND FUNCTION GLOBALLY SO THE HTML LAYOUT TAB CAN ACCESS IT ---
window.renderMemberMasterManagementWindow = renderMemberMasterManagementWindow;
