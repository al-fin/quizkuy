import 'package:flutter/material.dart';
import 'package:quizkuy/app/theme/colors.dart';
import 'package:quizkuy/app/theme/text_style.dart';

class HomeAppbar extends StatelessWidget {
  HomeAppbar(
      {@required this.name,
      @required this.handleLogout,
      @required this.onButtonTap,
      this.buttonText = 'Edit profile'});

  final String name;
  final String buttonText;
  final Function handleLogout;
  final Function onButtonTap;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Container(
        padding: EdgeInsets.fromLTRB(10, 0, 10, 0),
        decoration: BoxDecoration(
          color: Colors.white,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Icon(
                  Icons.account_circle,
                  color: Colors.grey[400],
                  size: 70,
                ),
                SizedBox(
                  width: 10,
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      name,
                      style: ThemeTextStyle(
                        color: ThemeColors.DARK,
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: SizedBox(
                        height: 24,
                        child: RaisedButton(
                          color: ThemeColors.PRIMARY,
                          padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
                          elevation: 0,
                          onPressed: onButtonTap,
                          child: Text(
                            buttonText,
                            style: ThemeTextStyle(
                              color: Colors.white,
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
            Material(
              color: Colors.transparent,
              shape: CircleBorder(),
              clipBehavior: Clip.hardEdge,
              child: IconButton(
                splashColor: ThemeColors.DANGER.withOpacity(0.1),
                color: ThemeColors.DANGER,
                icon: Icon(
                  Icons.logout,
                  size: 28,
                ),
                onPressed: handleLogout,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
