package com.gruber_client.components.radiobutton;


import android.content.Context;
import android.graphics.Color;
import android.content.res.ColorStateList;
import android.widget.RadioButton;
import android.app.Activity;
import android.graphics.PorterDuff;

public class RadioButtonView extends RadioButton {
  private boolean mAllowChange;

  public RadioButtonView(Context context) {
    super(context);
    mAllowChange = true;
  }

  @Override
  public void setChecked(boolean checked) {
    if (mAllowChange) {
      mAllowChange = false;
      super.setChecked(checked);
    }
  }


  void setOn(boolean on) {
    if (isChecked() != on) {
      super.setChecked(on);
    }
    mAllowChange = true;
  }
}
