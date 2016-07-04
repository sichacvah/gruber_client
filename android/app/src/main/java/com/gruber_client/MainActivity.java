package com.gruber_client;

import com.facebook.react.ReactActivity;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.gruber_client.components.ComponentsPackage;
import android.graphics.Color;
import android.app.ActivityManager.TaskDescription;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "gruber_client";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        TaskDescription taskDesc = new TaskDescription(null, null, Color.parseColor("#F7CE1C"));
        this.setTaskDescription(taskDesc);
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new FIRMessagingPackage(),
            new VectorIconsPackage(),
            new ComponentsPackage()
        );
    }
}
