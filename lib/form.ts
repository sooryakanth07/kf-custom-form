//create a form store class that takes the form ID and optional instance ID, and returns methods to get the form config and to get and set form values.
import { KFSDK } from "../../sdk/kfsdk.es";

export class FormStore {
  private sdk: KFSDK;
  private formId: string;
  private instanceId?: string;

  constructor(formId: string, instanceId?: string) {
    this.sdk = new KFSDK();
    this.formId = formId;
    this.instanceId = instanceId;
  }

  async getFormConfig() {
    const response = await this.sdk.forms.getFormConfig(this.formId);
    return response;
  }

  async getFieldOptions(fieldId: string) {
    const response = await this.sdk.forms.getFieldOptions(this.formId, fieldId);
    return response;
  }

  async getFormValues() {
    if (!this.instanceId) {
      throw new Error("Instance ID is required to get form values");
    }
    const response = await this.sdk.forms.getFormValues(this.formId, this.instanceId);
    return response;
  }

  async setFormValues(values: Record<string, any>) {
    if (!this.instanceId) {
      throw new Error("Instance ID is required to set form values");
    }
    const response = await this.sdk.forms.setFormValues(this.formId, this.instanceId, values);
    return response;
  }
}

const form = new FormStore("form123", "instance456");

const formValues = form.getFormValues()

const formConfig = form.