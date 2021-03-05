export const renderHandler = (component, templateId) => {
    let template = document.getElementById(templateId);
    let div = template.content.cloneNode(true);
    return component.appendChild(div);
}