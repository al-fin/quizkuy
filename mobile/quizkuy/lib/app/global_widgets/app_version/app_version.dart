import 'package:flutter/material.dart';
import 'package:quizkuy/app/theme/colors.dart';
import 'package:quizkuy/app/theme/text_style.dart';
import 'package:package_info/package_info.dart';

class AppVersion extends StatelessWidget {
  AppVersion({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<PackageInfo>(
        future: PackageInfo.fromPlatform(),
        builder: (builder, snapshot) {
          return Container(
            color: ThemeColors.DARK_BLUE,
            height: 24,
            child: Center(
              child: Text(
                snapshot.hasData
                    ? 'Versi ${snapshot.data.version}'
                    : 'Loading...',
                style: ThemeTextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w300,
                  fontSize: 12,
                ),
              ),
            ),
          );
        });
  }
}
